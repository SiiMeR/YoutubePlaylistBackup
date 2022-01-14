import { getConfig } from "./config";
import express from 'express';
import { JsonDatabase, PlaylistItem } from "./database";

const main = async () => {
  const config = getConfig();
  const port = config.Port;

  const app = express();
  const db = new JsonDatabase<PlaylistItem>(config.DatabaseFileRelativePath);

  app.use((req, res, next) => {
    console.debug(`${req.method} ${req.url}`);
    next();
  })

  app.get('/', (req, res) => {
    res.send('Try /playlists or /playlist/{id}')
  });

  app.get('/playlist/:id', (req, res) => {
    // TODO: Use req.params.id to get specific playlists.
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(db.getAll()));
  });

  app.post('/playlist/:id/update', (req, res) => {
    // TODO: Use req.params.id to update specific playlists.
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("Not implemented"));
  })

  app.listen(port, () =>
    console.log(`Backend listening at http://localhost:${port}`),
  );
}

main().catch(error => console.error(error));