import dotenv from 'dotenv';
import { from } from "env-var";

export interface Config {
    GoogleApiKey: string;
    PlayListURL: string;
    DatabaseFileRelativePath: string;
    Port: number;
};

export const getConfig = (): Config => {
    loadConfig();
    const environment = from(process.env);

    return {
        GoogleApiKey: environment.get('GOOGLE_API_KEY').required().asString(),
        PlayListURL: environment.get('YOUTUBE_PLAYLIST_URL').required().asUrlString(),
        DatabaseFileRelativePath: environment.get('DATABASE_FILE_RELATIVE_PATH').required().asString(),
        Port: environment.get('PORT').default(3001).asPortNumber()
    }
}

const loadConfig = () => {
    dotenv.config();
}
