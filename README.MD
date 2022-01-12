# YouTube Playlist Backup

A simple Node.js program that periodically downloads the titles of videos in a YouTube playlist and persists them somewhere else.

# Motivation 

Frequently, YouTube videos get set to private or deleted. This means that they won't show up in playlists anymore. The only way to find what the name of the video was is to search for the URL in archive.org or the internet. Sometimes this won't return any results because the video wasn't shared anywhere or was up for not too long to be archived. 

To be able to find replacement videos for my playlists, I created this small tool.
 
# Requirements 

* The latest Node.js LTS (tested on ``v16.13.1``)
* Youtube Data API v3 key
# Running

## Backend

1. Obtain a YouTube Data API v3 key from `https://console.cloud.google.com/apis/credentials`.
1. Create a file named `.env` in the folder `src/backend`.
1. Add the following configuration into the newly created file, filling in your details (or pass these variables in directly from the environment):
````
GOOGLE_API_KEY=INSERT_YOUR_API_KEY_HERE
YOUTUBE_PLAYLIST_URL=INSERT_YOUR_PLAYLIST_URL_HERE
DATABASE_FILE_RELATIVE_PATH=db.json
````
1. Run the `yarn start` command to start the program.

## Frontend

TBD