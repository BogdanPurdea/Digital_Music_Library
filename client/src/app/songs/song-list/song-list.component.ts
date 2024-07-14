import { Component, Input } from '@angular/core';
import { Song } from '../../models/song';
import { Album } from '../../models/album';
import { SongService } from '../../services/song.service';
import { SongCreateComponent } from '../song-create/song-create.component';
import { SongUpdateComponent } from '../song-update/song-update.component';
import { SharedService } from '../../services/shared.service';
import { Artist } from '../../models/artist';
import { SharedModule } from '../../_modules/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [SharedModule, SongCreateComponent, SongUpdateComponent, ConfirmDialogComponent],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent {
  songs: Song[] = [];
  @Input() artist: Artist | null = null;
  @Input() album: Album | null = null;
  showUpdateForm = false;
  selectedSong: Song | null = null;

  constructor(private songService: SongService, private sharedService: SharedService,
    public dialog: MatDialog) { }

  ngOnChanges(): void {
    this.loadSongs();
  }

  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
  }

  loadSongs(): void {
    if (this.album !== null)
      this.songs = this.album.songs;
  }

  deleteSong(albumId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '200px',
      height: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true)
        this.songService.deleteSong(this.artist!._id, this.album!._id, albumId).subscribe({
          next: () => {
            this.sharedService.notify(this.artist, this.album);
            this.loadSongs();
          },
          error: (error) => console.error("Error deleting songs", error)
        });
    });
  }

  selectSong(song: Song | null): void {
    if (this.selectedSong === song) {
      this.selectedSong = null;
    }
    else
      this.selectedSong = song;
  }
}
