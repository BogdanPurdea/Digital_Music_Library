import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, from, map, mergeMap, of, throwError } from 'rxjs';
import { Song } from '../models/song';
import { AlbumService } from './album.service';
import { SongSearchResult } from '../models/songSearchResults';
import { Artist } from '../models/artist';
import { AlbumSearchResult } from '../models/albumSearchResult';

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

  getArtistsWithAlbumsFromSongs(): Observable<Artist[]> {
    return this.getSongs().pipe(
      map((songResults: SongSearchResult[]) => {
        const artistMap = new Map<string, Artist>();
        songResults.forEach(songResult => {
          if (!artistMap.has(songResult.artistId)) {
            artistMap.set(songResult.artistId, {
              _id: songResult.artistId,
              name: songResult.artistName,
              albums: []
            });
          }
      
          const artist = artistMap.get(songResult.artistId);
          if (artist) {
            const albumExists = artist.albums.some(album => album._id === songResult.albumId);
      
            if (!albumExists) {
              artist.albums.push({
                _id: songResult.albumId,
                title: songResult.albumName,
                description: '',
                songs: []
              });
            }
          }
        });
      
        return Array.from(artistMap.values());
      }));
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
