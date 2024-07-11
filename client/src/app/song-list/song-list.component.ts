import { Component, Input } from '@angular/core';
import { Song } from '../models/song';
import { ArtistService } from '../services/artist.service';
import { Album } from '../models/album';
import { MatListItem, MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent {
  songs: Song[] = [];
  @Input() album: Album | null = null;

  constructor() {}

  ngOnChanges(): void {
      this.loadSongs();
  }

  loadSongs(): void {
    if(this.album !== null)
      this.songs = this.album.songs;
  }
}
