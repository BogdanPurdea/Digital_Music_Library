import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Album } from '../../models/album';
import { AlbumService } from '../../services/album.service';
import { ArtistService } from '../../services/artist.service';
import { MatListModule } from '@angular/material/list';
import { Artist } from '../../models/artist';
import { SongListComponent } from '../../songs/song-list/song-list.component';
import { AlbumFormComponent } from "../album-form/album-form.component";
import { SongFormComponent } from '../../songs/song-form/song-form.component';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [MatListModule, SongListComponent, SongFormComponent],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css'
})
export class AlbumListComponent implements OnChanges{

  albums: Album[] = [];
  @Input() artist: Artist | null = null;
  selectedAlbum: Album | null = null;

  constructor(private albumService: AlbumService) {}

  ngOnChanges(): void {
    this.loadAlbums();
  }

  loadAlbums(): void {
    if(this.artist !== null) {
      this.albums = this.artist?.albums!;
    }
  }

  selectAlbum(album: Album): void {
    if(this.selectedAlbum === album) {
      this.selectedAlbum = null;
    }
    else
      this.selectedAlbum = album;
  }

  deleteAlbum(albumId: string): void {
    this.albumService.deleteAlbum(this.artist!._id, albumId).subscribe({
      next: () => this.loadAlbums(),
      error: (error) => console.error("Error deleting album", error)
    })
  }
}
