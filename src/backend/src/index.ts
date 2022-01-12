import Youtube from 'youtube.ts'

const config = {
  GOOGLE_API_KEY: 'YOUR_GOOGLE_API_KEY', 
}

async function useAPI() {
  /*Instantiate a new Youtube object with your Google API key.*/
  const youtube = new Youtube(process.env.GOOGLE_API_KEY)

  /*Retrieving all of the items for a playlist is done in a seperate API call.*/
  const playlistItems = await youtube.playlists.items("https://www.youtube.com/playlist?list=PLtTn3J8rgxnbnBhwznxUemZTc0_dLbYhq")
}