import { Song } from "./song";

export interface Album {
    _id: string,
    title: string,
    songs: Song[],
    description: string
}