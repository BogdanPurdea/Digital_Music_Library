import { Component, Input } from '@angular/core';
import { Song } from '../../models/song';
import { ArtistService } from '../../services/artist.service';
import { Album } from '../../models/album';
import { MatListItem, MatListModule } from '@angular/material/list';
import { SongService } from '../../services/song.service';
import { SongCreateComponent } from '../song-create/song-create.component';
import { MatButtonModule } from '@angular/material/button';
import { SongUpdateComponent } from '../song-update/song-update.component';
import { SharedService } from '../../services/shared.service';
import { Artist } from '../../models/artist';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [MatListModule, SongCreateComponent, MatButtonModule, 
    SongUpdateComponent, MatSlideToggleModule],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent {
  songs: Song[] = [];
  @Input() artist: Artist | null = null;
  @Input() album: Album | null = null;
  showUpdateForm = false;
  selectedSong: Song | null = null;

  constructor(private songService: SongService, private sharedService: SharedService) {}

  ngOnChanges(): void {
      this.loadSongs();
  }

  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
  }

  loadSongs(): void {
    if(this.album !== null)
      this.songs = this.album.songs;
  }

  deleteSong(albumId: string): void {
    this.songService.deleteSong(this.artist!._id, this.album!._id, albumId).subscribe({
      next: () => {
        this.sharedService.notify(this.artist, this.album);
        this.loadSongs();
      },
      error: (error) => console.error("Error deleting songs", error)
    })
  }

  selectSong(song: Song | null): void {
    if(this.selectedSong === song) {
      this.selectedSong = null;
    }
    else 
      this.selectedSong = song;
  }
}
