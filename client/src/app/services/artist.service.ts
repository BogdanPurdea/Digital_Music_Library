import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  apiUrl = environment.apiUrl;
  artists: Artist[] = [];

  constructor(private http: HttpClient) { }

  getArtist(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.apiUrl + 'artists');
  }
}
