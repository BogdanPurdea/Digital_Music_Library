import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private submittedSource = new Subject<any>();
  submitted$ = this.submittedSource.asObservable();

  constructor() { }

  notify(selectedArtist: Artist | null, selectedAlbum: Album | null): void {
    this.submittedSource.next({ selectedArtist, selectedAlbum });
  }
}
