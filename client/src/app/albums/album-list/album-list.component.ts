import { Component, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Album } from '../../models/album';
import { AlbumService } from '../../services/album.service';
import { MatListModule } from '@angular/material/list';
import { Artist } from '../../models/artist';
import { SongListComponent } from '../../songs/song-list/song-list.component';
import { SongCreateComponent } from '../../songs/song-create/song-create.component';
import { MatButtonModule } from '@angular/material/button';
import { AlbumUpdateComponent } from '../album-update/album-update.component';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [MatListModule, SongListComponent, SongCreateComponent, 
    MatButtonModule, AlbumUpdateComponent, MatSlideToggleModule],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css'
})
export class AlbumListComponent implements OnInit, OnChanges, OnDestroy {

  albums: Album[] = [];
  @Input() artist: Artist | null = null;
  selectedAlbum: Album | null = null;
  submittedSubscription!: Subscription;
  showCreateForm = false;
  showUpdateForm = false;

  constructor(private albumService: AlbumService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.selectedAlbum = null;
    this.submittedSubscription = this.sharedService.submitted$.subscribe((submittedData) => {
      this.loadAlbums();
      this.selectAlbum(submittedData.selectedAlbum);
    });
  }

  ngOnChanges(): void {
    this.loadAlbums(); 
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

  loadAlbums(): void {
    if (this.artist !== null) {
      this.albums = this.artist?.albums!;
    }
  }

  selectAlbum(album: Album | null): void {
    if (this.selectedAlbum === album) {
      this.selectedAlbum = null;
    }
    else
      this.selectedAlbum = album;
  }

  deleteAlbum(albumId: string): void {
    this.albumService.deleteAlbum(this.artist!._id, albumId).subscribe({
      next: () => {
        this.sharedService.notify(this.artist!, null);
        this.loadAlbums();
      },
      error: (error) => console.error("Error deleting album", error)
    })
  }
}
