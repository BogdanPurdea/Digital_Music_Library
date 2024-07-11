import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { AlbumService } from '../services/album.service';
import { ArtistService } from '../services/artist.service';
import { MatListModule } from '@angular/material/list';
import { Artist } from '../models/artist';
import { SongListComponent } from '../song-list/song-list.component';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [MatListModule, SongListComponent],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css'
})
export class AlbumListComponent implements OnChanges{

  albums: Album[] = [];
  @Input() artist: Artist | null = null;
  selectedAlbum: Album | null = null;

  constructor() {}

  ngOnChanges(): void {
      this.loadAlbums();
  }

  loadAlbums(): void {
    if(this.artist !== null)
      this.albums = this.artist?.albums!;
  }

  selectAlbum(album: Album): void {
    if(this.selectedAlbum === album) {
      this.selectedAlbum = null;
    }
    else
      this.selectedAlbum = album;
  }
}
