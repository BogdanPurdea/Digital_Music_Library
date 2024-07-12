import { Component, OnInit } from '@angular/core';
import { Artist } from '../../models/artist';
import { ArtistService } from '../../services/artist.service';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlbumListComponent } from '../../albums/album-list/album-list.component';
import { ArtistCreateComponent } from '../artist-create/artist-create.component';
import { AlbumCreateComponent } from '../../albums/album-create/album-create.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ArtistUpdateComponent } from '../artist-update/artist-update.component';

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [RouterModule, CommonModule, MatListModule, AlbumListComponent, ArtistCreateComponent, 
    AlbumCreateComponent, MatButtonModule, MatCardModule, ArtistUpdateComponent],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.css'
})
export class ArtistListComponent implements OnInit{
  
  artists: Artist[] = [];
  selectedArtist: Artist | null = null;

  constructor(private artistService: ArtistService ) {}

  ngOnInit(): void {
    this.loadArtists();
  }

  loadArtists(): void {
    this.artistService.getArtists().subscribe({
      next: (artists) => this.artists = artists,
      error: (error) => console.error("Error loading artists", error)
    });
  }

  selectArtist(artist: Artist): void {
    if(this.selectedArtist === artist) {
      this.selectedArtist = null;
    }
    else 
      this.selectedArtist = artist;
  }

  deleteArtist(artistId: string): void {
    this.artistService.deleteArtist(artistId).subscribe({
      next: () => this.loadArtists(),
      error: (error) => console.error("Error deleting artist", error)
    })
  }
}
