import { Song } from "./song";

export interface SongSearchResult {
    artistId: string,
    artistName: string,
    albumId: string,
    albumName: string,
    song: Song
}