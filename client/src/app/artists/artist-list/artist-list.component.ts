import { Component, OnDestroy, OnInit } from '@angular/core';
import { Artist } from '../../models/artist';
import { ArtistService } from '../../services/artist.service';
import { AlbumListComponent } from '../../albums/album-list/album-list.component';
import { ArtistCreateComponent } from '../artist-create/artist-create.component';
import { AlbumCreateComponent } from '../../albums/album-create/album-create.component';
import { ArtistUpdateComponent } from '../artist-update/artist-update.component';
import { Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';
import { SharedModule } from '../../_modules/shared.module';

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [SharedModule, AlbumListComponent, ArtistCreateComponent,
    AlbumCreateComponent, ArtistUpdateComponent],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.css'
})
export class ArtistListComponent implements OnInit, OnDestroy {

  artists: Artist[] = [];
  searchControl = new FormControl();
  selectedArtistId: string | null = null;
  submittedSubscription!: Subscription;
  showCreateArtistForm = false;
  showCreateAlbumForm = false;
  showUpdateArtistForm = false;

  constructor(private artistService: ArtistService, private sharedService: SharedService,
    private searchService: SearchService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.setUpSearchControl();

    this.loadArtists();
    // Subscribe to submitted event
    this.submittedSubscription = this.sharedService.submitted$.subscribe((submittedData) => {
      this.selectedArtistId = null;
      this.loadArtists();
      this.selectArtist(submittedData.selectedArtist);
    });
  }

  ngOnDestroy(): void {
    if (this.submittedSubscription) {
      this.submittedSubscription.unsubscribe();
    }
  }

  toggleCreateArtistForm() {
    this.showCreateArtistForm = !this.showCreateArtistForm;
  }

  toggleCreateAlbumForm() {
    this.showCreateAlbumForm = !this.showCreateAlbumForm;
    this.showUpdateArtistForm = false;
  }

  toggleUpdateArtistForm() {
    this.showUpdateArtistForm = !this.showUpdateArtistForm;
    this.showCreateAlbumForm = false;
  }

  setUpSearchControl(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.searchService.searchArtist(query))
    ).subscribe({
      next: (artists) => this.artists = artists,
      error: (error) => console.error("Error loading artists", error)
    });
  }

  loadArtists(): void {
    this.artistService.getArtists().subscribe({
      next: (artists) => this.artists = artists,
      error: (error) => console.error("Error loading artists", error)
    });
  }

  selectArtist(artistId: string | null): void {
    if (this.selectedArtistId === artistId) {
      this.selectedArtistId = null;
    }
    else
      this.selectedArtistId = artistId;
  }

  deleteArtist(artistId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '200px',
      height: '150px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true)
        this.artistService.deleteArtist(artistId).subscribe({
          next: () => this.loadArtists(),
          error: (error) => console.error("Error deleting artist", error)
        });
    });

  }
}
