import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Album } from '../models/album';
import { Observable, catchError, from, map, mergeMap, throwError } from 'rxjs';
import { ArtistService } from './artist.service';
import { AlbumSearchResult } from '../models/albumSearchResult';
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private artistService: ArtistService) { }

  getAlbums(): Observable<AlbumSearchResult[]> {
    return this.artistService.getArtists().pipe(
      mergeMap(artists => {
        const results: AlbumSearchResult[] = [];
        artists.forEach(artist => {
          artist.albums.forEach(album => {
            const albumSearchResult: AlbumSearchResult = {
              artistId: artist._id,
              artistName: artist.name,
              album: album
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

  getAlbumsByArtistId(artistId: string): Observable<Album[]> {
    return this.artistService.getArtistById(artistId).pipe(
      map(artist => artist.albums),
      catchError(error => {
        console.error('Error loading albums', error);
        return throwError('Error loading albums');
      })
    );
  }

  getAlbumById(artistId: string, albumId: string): Observable<Album | undefined> {
    return this.getAlbumsByArtistId(artistId).pipe(
      map(albums => albums.find(album => album._id === albumId),
        catchError(error => {
          console.error('Error loading albums', error);
          return throwError('Error loading albums');
        }))
    );
  }


  getAlbumSearchResultByAlbumId(albumSearchResults: AlbumSearchResult[], albumId: string): AlbumSearchResult | undefined {
    return albumSearchResults.find(result => result.album._id === albumId);
  }

  getArtistsFromAlbums(): Observable<Artist[]> {
    return this.getAlbums().pipe(
      map((albumResults: AlbumSearchResult[]) => {
        const artistMap = new Map<string, Artist>();
        albumResults.forEach(albumResult => {
          if (!artistMap.has(albumResult.artistId)) {
            artistMap.set(albumResult.artistId, {
              _id: albumResult.artistId, 
              name: albumResult.artistName, 
              albums: []
            });
          }
        });
        return Array.from(artistMap.values());
      })
    );
  }

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
