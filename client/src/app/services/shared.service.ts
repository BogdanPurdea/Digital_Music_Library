import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private submittedSource = new Subject<any>();
  submitted$ = this.submittedSource.asObservable();

  constructor() { }

  notify(selectedArtistId: string | null, selectedAlbumId: string | null): void {
    this.submittedSource.next({ selectedArtistId, selectedAlbumId });
  }
}
