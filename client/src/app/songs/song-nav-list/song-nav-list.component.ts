import { Component, Input } from '@angular/core';
import { Song } from '../../models/song';
import { SongService } from '../../services/song.service';
import { MatDialog } from '@angular/material/dialog';
import { ArtistService } from '../../services/artist.service';
import { SharedService } from '../../services/shared.service';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';
import { SongUpdateComponent } from '../song-update/song-update.component';
import { SongCreateComponent } from '../song-create/song-create.component';
import { SharedModule } from '../../_modules/shared.module';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { SongSearchResult } from '../../models/songSearchResults';

@Component({
  selector: 'app-song-nav-list',
  standalone: true,
  imports: [SharedModule, SongCreateComponent, SongUpdateComponent, ConfirmDialogComponent],
  templateUrl: './song-nav-list.component.html',
  styleUrl: './song-nav-list.component.css'
})
export class SongNavListComponent {

  songs: SongSearchResult[] = [];
  searchControl = new FormControl();
  showUpdateForm = false;
  submittedSubscription!: Subscription;
  selectedSongId: string | null = null;

  constructor(private songService: SongService, private artistService: ArtistService, private sharedService: SharedService,
    public dialog: MatDialog, private searchService: SearchService) { }

  ngOnInit(): void {
    this.loadAllSongs();
    this.setUpSearchControl();
    this.submittedSubscription = this.sharedService.submitted$.subscribe((submittedData) => {
      this.loadAllSongs();
    });
  }


  ngOnChanges(): void {
    this.loadAllSongs();
  }

  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
  }

  setUpSearchControl(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.searchService.searchSong(query))
    ).subscribe({
      next: (songs) => this.songs = songs,
      error: (error) => console.error("Error loading songs", error)
    });
  }
  
  loadAllSongs(): void {
    this.songService.getSongs().subscribe({
      next: (songs) => this.songs = songs,
      error: (error) => console.error("Error loading songs", error)
    });
  }

  deleteSong(songId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '200px',
      height: '150px'
    });

    const songSearchResult = this.songService.getSongSearchResultBySongId(this.songs, songId);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true)
        this.songService.deleteSong(songSearchResult?.artistId!, songSearchResult?.albumId!, songId).subscribe({
          next: () => {
            this.sharedService.notify(songSearchResult?.artistId!, songSearchResult?.albumId!);
            this.loadAllSongs();
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
