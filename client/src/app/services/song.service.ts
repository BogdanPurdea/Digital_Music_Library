import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addSong(artistId: string, albumId: string, song: Song): Observable<Song> {
    return this.http.post<Song>(this.apiUrl + '/' + artistId + '/albums/' + albumId +'/songs', song);
  }

  updateSong(artistId: string, albumId: string, songId: string, song: Song): Observable<Song> {
    return this.http.put<Song>(this.apiUrl + '/' + artistId + '/albums/' + albumId + '/songs/' + songId, song);
  }

  deleteSong(artistId: string, albumId: string, songId: string) {
    return this.http.delete(this.apiUrl + '/' + artistId + '/albums/' + albumId + '/songs/' + songId);
  }
}
