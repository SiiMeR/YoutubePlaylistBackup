import Youtube, { YoutubePlaylistItem, YoutubePlaylistItemsSearch } from 'youtube.ts';
import { Config } from './config';
import { JsonDatabase, PlaylistItem } from './database';
import { replaceLine } from './helpers';

export const update = async (config: Config): Promise<void> => {
    const db = new JsonDatabase<PlaylistItem>(config.DatabaseFileRelativePath);

    const youtube = new Youtube(process.env.GOOGLE_API_KEY);
    const playlist = await youtube.playlists.get(config.PlayListURL);

    const playlistVideos = await loadVideos(youtube, config.PlayListURL, playlist.contentDetails.itemCount);
    console.log(`Found ${playlistVideos.length} videos in playlist '${playlist.snippet.title}'.`)

    const videoItems = playlistVideos.map(video => { return { id: video.id, title: video.snippet.title, lastUpdated: new Date() }; });

    let updatedItems = 0;
    for (const item of videoItems) {
        const result = db.insert(item);
        if (result) {
            updatedItems += 1;
        }
    }

    console.log(`Successfully added ${updatedItems} songs into the database.`)
}

const loadVideos = async (youtube: Youtube, url: string, totalVideoCount: number): Promise<YoutubePlaylistItem[]> => {
    const videos: YoutubePlaylistItem[] = [];

    let nextPageToken: string | undefined = undefined;
    do {
        replaceLine(`Querying videos from playlist. Progress ${videos.length}/${totalVideoCount} videos...`);

        let playlistItems: YoutubePlaylistItemsSearch = await youtube.playlists.items(url, { pageToken: nextPageToken ?? undefined });
        videos.push(...playlistItems.items);

        nextPageToken = playlistItems.nextPageToken;
    }
    while (videos.length < totalVideoCount)

    console.log("\n") // Needed because otherwise the next console.log call will overwrite the last progress update

    return videos;
}