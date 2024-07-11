import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artist';
import { Observable } from 'rxjs';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  apiUrl = environment.apiUrl;
  artists: Artist[] = [];

  constructor(private http: HttpClient) { }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.apiUrl);
  }

  getArtistById(id: string): Observable<Artist> {
    return this.http.get<Artist>(this.apiUrl + '/' + id);
  }

  createArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.apiUrl, artist);
  }

  updateArtist(id: string, artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(this.apiUrl + '/' + id, artist);
  }

  deleteArtist(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
