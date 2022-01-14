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
1. Make a copy of the file `.env.template` in the folder `src/backend` and rename it to `.env.local`.
1. Fill in your details in the newly created `.env.local` file (or pass these variables in directly from the environment)
1. Run the `npm run start` or `yarn start` command to start the program.

## Frontend

TBD