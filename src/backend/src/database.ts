import { existsSync, openSync, readFileSync, writeFile, writeFileSync } from "fs";
import { join } from "path";

export interface PlaylistItem {
    id: string;
    title: string;
    lastUpdated: Date;
}

interface IdLike {
    id: string;
}

export class JsonDatabase<TData extends IdLike> {

    #databaseFilename: string;
    #data: TData[];

    constructor(fileName: string) {
        const file = join(__dirname, fileName);

        this.#databaseFilename = file;
        this.#data = [];

        if (existsSync(file)) {
            this.#data = this.deserialize(file);
            return;
        }
        else {
            openSync(file, 'w');
        }
    }

    private deserialize(fileName: string): TData[] {
        const existingData = readFileSync(fileName).toString();
        return JSON.parse(existingData);
    }

    private serialize(fileName: string): void {
        try {
            writeFileSync(fileName, JSON.stringify(this.#data));
        } catch (exception) {
            console.error(`Failed to update database file: ${exception}`);
        }
    }

    public findById(id: string): TData | undefined {
        return this.#data.find(item => item.id === id);
    }

    public getAll(): TData[] {
        return this.#data ?? [];
    }

    public insert(item: TData): boolean {
        for (const data of this.#data) {
            if (data.id === item.id) {
                return false;
            }
        }

        this.#data.push(item);
        this.serialize(this.#databaseFilename);

        return true;
    }
}