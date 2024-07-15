import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist';
import { AlbumSearchResult } from '../models/albumSearchResult';
import { SongSearchResult } from '../models/songSearchResults';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  searchArtist(query: string): Observable<Artist[]> {
    query = encodeURIComponent(query);
    return this.http.get<Artist[]>(this.apiUrl + '/search?q=' + query);
  }

  searchAlbum(query: string): Observable<AlbumSearchResult[]> {
    query = encodeURIComponent(query);
    return this.http.get<AlbumSearchResult[]>(this.apiUrl + '/search/albums?q=' + query);
  }

  searchSong(query: string): Observable<SongSearchResult[]> {
    query = encodeURIComponent(query);
    return this.http.get<SongSearchResult[]>(this.apiUrl + '/search/songs?q=' + query);
  }
}
