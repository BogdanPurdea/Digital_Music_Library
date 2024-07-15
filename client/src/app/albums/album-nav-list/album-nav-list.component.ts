import { Component, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Album } from '../../models/album';
import { AlbumService } from '../../services/album.service';
import { Artist } from '../../models/artist';
import { SongListComponent } from '../../songs/song-list/song-list.component';
import { SongCreateComponent } from '../../songs/song-create/song-create.component';
import { AlbumUpdateComponent } from '../album-update/album-update.component';
import { SharedService } from '../../services/shared.service';
import { Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SharedModule } from '../../_modules/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';
import { ArtistService } from '../../services/artist.service';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { AlbumSearchResult } from '../../models/albumSearchResult';

@Component({
  selector: 'app-album-nav-list',
  standalone: true,
  imports: [SharedModule, SongListComponent, SongCreateComponent, AlbumUpdateComponent, ConfirmDialogComponent],
  templateUrl: './album-nav-list.component.html',
  styleUrl: './album-nav-list.component.css'
})
export class AlbumNavListComponent implements OnInit, OnChanges, OnDestroy {

  albums: AlbumSearchResult[] = [];
  searchControl = new FormControl();
  selectedAlbumId: string | null = null;
  submittedSubscription!: Subscription;
  showCreateForm = false;
  showUpdateForm = false;

  constructor(private albumService: AlbumService, private sharedService: SharedService, 
    private searchService: SearchService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadAllAlbums();
    this.setUpSearchControl();
    this.submittedSubscription = this.sharedService.submitted$.subscribe((submittedData) => {
      this.loadAllAlbums();
      this.selectAlbum(submittedData.selectedAlbum);
    });
  }

  ngOnChanges(): void {
    this.loadAllAlbums();
  }

  ngOnDestroy(): void {
    if (this.submittedSubscription) {
      this.submittedSubscription.unsubscribe();
    }
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    this.showUpdateForm = false;
  }

  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
    this.showCreateForm = false;
  }

  setUpSearchControl(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.searchService.searchAlbum(query))
    ).subscribe({
      next: (albums) => this.albums = albums,
      error: (error) => console.error("Error loading artists", error)
    });
  }

  loadAllAlbums(): void {
    this.albumService.getAlbums().subscribe({
      next: (albums) => this.albums = albums,
      error: (error) => console.error("Error loading artists", error)
    });
  }

  selectAlbum(albumId: string | null): void {
    if (this.selectedAlbumId === albumId) {
      this.selectedAlbumId = null;
    }
    else
      this.selectedAlbumId = albumId;
  }

  deleteAlbum(albumId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '200px',
      height: '150px'
    });

    const albumSearchResult = this.albumService.getAlbumSearchResultByAlbumId(this.albums, albumId);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true)
        this.albumService.deleteAlbum(albumSearchResult?.artistId!, albumId).subscribe({
          next: () => {
            this.sharedService.notify(albumSearchResult?.artistId!, null);
            this.loadAllAlbums();
          },
          error: (error) => console.error("Error deleting album", error)
        });
    });
  }
}
