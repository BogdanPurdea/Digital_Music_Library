import { Album } from "./album";

export interface Artist {
    _id: string,
    name: string,
    albums: Album[]
}