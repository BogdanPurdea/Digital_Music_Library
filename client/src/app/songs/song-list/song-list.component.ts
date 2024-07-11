import { Component, Input } from '@angular/core';
import { Song } from '../../models/song';
import { ArtistService } from '../../services/artist.service';
import { Album } from '../../models/album';
import { MatListItem, MatListModule } from '@angular/material/list';
import { SongService } from '../../services/song.service';
import { SongFormComponent } from '../song-form/song-form.component';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [MatListModule, SongFormComponent],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent {
  songs: Song[] = [];
  @Input() artistId: string | null = null;
  @Input() album: Album | null = null;

  constructor(private songService: SongService) {}

  ngOnChanges(): void {
      this.loadSongs();
  }

  loadSongs(): void {
    if(this.album !== null)
      this.songs = this.album.songs;
  }

  deleteSong(albumId: string): void {
    this.songService.deleteSong(this.artistId!, this.album!._id, albumId).subscribe({
      next: () => this.loadSongs(),
      error: (error) => console.error("Error deleting songs", error)
    })
  }
}
