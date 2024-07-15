import { Album } from "./album";

export interface AlbumSearchResult {
    artistId: string,
    artistName: string,
    album: Album
}