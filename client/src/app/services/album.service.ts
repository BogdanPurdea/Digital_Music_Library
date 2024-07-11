import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Album } from '../models/album';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addAlbum(artistId: string, album: Album): Observable<Album> {
    return this.http.post<Album>(this.apiUrl + '/' + artistId + '/albums', album);
  }

  updateAlbum(artistId: string, albumId: string, album: Album): Observable<Album> {
    return this.http.put<Album>(this.apiUrl + '/' + artistId + '/albums/' + albumId, album);
  }

  deleteAlbum(artistId: string, albumId: string) {
    return this.http.delete(this.apiUrl + '/' + artistId + '/albums/' + albumId);
  }
}
