import Youtube, { YoutubePlaylistItem, YoutubePlaylistItemsSearch } from 'youtube.ts';
import { getConfig } from './config';
import { replaceLine } from './helpers';


const main = async () => {
  const config = getConfig();

  const youtube = new Youtube(process.env.GOOGLE_API_KEY)
  const playlist = await youtube.playlists.get(config.PlayListURL)

  const playlistVideos = await loadVideos(youtube, config.PlayListURL, playlist.contentDetails.itemCount);
  console.log(`Found ${playlistVideos.length} videos in playlist '${playlist.snippet.title}'.`)

  for (const video of playlistVideos) {
    console.log(video.snippet.title);
  }
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

  console.log("\n")

  return videos;
}

main().catch(error => console.error(error));