import dotenv from 'dotenv';
import { from } from "env-var";

export interface Config {
    GoogleApiKey: string;
    PlayListURL: string;
    DatabaseFileRelativePath: string;
};

export const getConfig = (): Config => {
    loadConfig();
    const environment = from(process.env);

    return {
        GoogleApiKey: environment.get('GOOGLE_API_KEY').required().asString(),
        PlayListURL: environment.get('YOUTUBE_PLAYLIST_URL').required().asUrlString(),
        DatabaseFileRelativePath: environment.get('DATABASE_FILE_RELATIVE_PATH').required().asString()
    }
}

const loadConfig = () => {
    dotenv.config();
}
