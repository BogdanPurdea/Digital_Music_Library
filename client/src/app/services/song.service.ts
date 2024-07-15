import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, from, map, mergeMap, throwError } from 'rxjs';
import { Song } from '../models/song';
import { AlbumService } from './album.service';
import { SongSearchResult } from '../models/songSearchResults';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private albumService: AlbumService) { }


  getSongs(): Observable<SongSearchResult[]> {
    return this.albumService.getAlbums().pipe(
      mergeMap(albums => {
        const results: SongSearchResult[] = [];
        albums.forEach(album => {
          album.album.songs.forEach(song => {
            const albumSearchResult: SongSearchResult = {
              artistId: album.artistId,
              artistName: album.artistName,
              albumId: album.album._id,
              albumName: album.album.title,
              song: song
            };
            results.push(albumSearchResult);
          });
        });
        return from([results]);
      }),
      catchError(error => {
        console.error('Error loading albums', error);
        return throwError('Error loading albums');
      })
    );
  }

  getSongsByAlbumId(artistId: string, albumId: string): Observable<Song[]> {
    return this.albumService.getAlbumById(artistId, albumId).pipe(
      map(album => album ? album.songs : []),
      catchError(error => {
        console.error('Error loading songs', error);
        return throwError('Error loading songs');
      })
    );
  }

  getSongSearchResultBySongId(songSearchResults: SongSearchResult[], songId: string): SongSearchResult | undefined {
    return songSearchResults.find(result => result.song._id === songId);
  }

  addSong(artistId: string, albumId: string, song: Song): Observable<Song> {
    return this.http.post<Song>(this.apiUrl + '/' + artistId + '/albums/' + albumId + '/songs', song);
  }

  updateSong(artistId: string, albumId: string, songId: string, song: Song): Observable<Song> {
    return this.http.put<Song>(this.apiUrl + '/' + artistId + '/albums/' + albumId + '/songs/' + songId, song);
  }

  deleteSong(artistId: string, albumId: string, songId: string) {
    return this.http.delete(this.apiUrl + '/' + artistId + '/albums/' + albumId + '/songs/' + songId);
  }
}
