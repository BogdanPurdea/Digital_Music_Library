import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  searchArtist(query: string): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.apiUrl + '/search?q=' + query);
  }
}
