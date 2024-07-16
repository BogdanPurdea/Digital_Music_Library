import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
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
import { ArtistService } from '../../services/artist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [SharedModule, SongUpdateComponent, ConfirmDialogComponent],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent implements OnInit, OnChanges, OnDestroy {
  songs: Song[] = [];
  @Input() artistId: string | null = null;
  @Input() albumId: string | null = null;
  showUpdateForm = false;
  submittedSubscription!: Subscription;
  selectedSongId: string | null = null;

  constructor(private songService: SongService, private sharedService: SharedService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.submittedSubscription = this.sharedService.submitted$.subscribe((submittedData) => {
      this.loadSongs();
    });
  }

  ngOnChanges(): void {
    if (this.albumId !== null)
      this.loadSongs();
    this.selectedSongId = null;
  }

  ngOnDestroy(): void {
    if (this.submittedSubscription) {
      this.submittedSubscription.unsubscribe();
    }
  }

  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
  }

  loadSongs(): void {
    if (this.artistId !== null && this.albumId !== null) {
      this.songService.getSongsByAlbumId(this.artistId, this.albumId).subscribe({
        next: (songs) => this.songs = songs,
        error: (error) => console.error("Error loading artists", error)
      });
    }
  }

  deleteSong(songId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '200px',
      height: '150px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true)
        this.songService.deleteSong(this.artistId!, this.albumId!, songId).subscribe({
          next: () => {
            this.sharedService.notify(this.artistId, this.albumId);
            this.loadSongs();
          },
          error: (error) => console.error("Error deleting songs", error)
        });
    });
  }

  selectSong(songId: string | null): void {
    if (this.selectedSongId === songId) {
      this.selectedSongId = null;
    }
    else
      this.selectedSongId = songId;
  }
}
