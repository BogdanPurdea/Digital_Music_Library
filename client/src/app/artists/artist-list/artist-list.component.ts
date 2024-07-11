import { Component, OnInit } from '@angular/core';
import { Artist } from '../../models/artist';
import { ArtistService } from '../../services/artist.service';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlbumListComponent } from '../../albums/album-list/album-list.component';
import { ArtistFormComponent } from '../artist-form/artist-form.component';
import { AlbumFormComponent } from '../../albums/album-form/album-form.component';

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [RouterModule, CommonModule, MatListModule, AlbumListComponent, ArtistFormComponent, AlbumFormComponent],
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
