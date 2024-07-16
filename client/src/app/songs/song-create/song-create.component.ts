import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SongService } from '../../services/song.service';
import { Album } from '../../models/album';
import { Artist } from '../../models/artist';
import { SharedService } from '../../services/shared.service';
import { SharedModule } from '../../_modules/shared.module';

@Component({
  selector: 'app-song-create',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './song-create.component.html',
  styleUrl: './song-create.component.css'
})
export class SongCreateComponent implements OnInit, OnChanges {
  songForm!: FormGroup;
  @Input() artistId: string | null = null;
  @Input() albumId: string | null = null;
  artists: Artist[] | null = null;
  albums: Album[] | null = null;

  constructor(private formBuilder: FormBuilder, private songService: SongService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.initializeFormGroup();
    if (this.artistId === null && this.albumId === null)
      this.songService.getArtistsWithAlbumsFromSongs().subscribe({
        next: (artistResults) => {
          this.artists = artistResults;
        },
        error: (error) => {
          console.error('Error loading artists', error);
        }
      });
    else {
      this.songForm.patchValue({ selectedArtist: this.artistId, selectedAlbum: this.albumId })
    }
  }

  ngOnChanges(): void {
    this.initializeFormGroup();
  }


  initializeFormGroup(): void {
    this.songForm = this.formBuilder.group({
      selectedArtist: ['', Validators.required],
      selectedAlbum: ['', Validators.required],
      title: ['', Validators.required],
      length: ['', Validators.required]
    });
  }

  onSelect(value: string): void {
    const selectedArtistId = value;
    const selectedArtist = this.artists?.find(artist => artist._id === selectedArtistId);
    this.albums = selectedArtist!.albums;
  }

  onSubmit(): void {
    if (this.songForm.valid) {
      const formData = { ...this.songForm.value };
      this.artistId = formData.selectedArtist;
      this.albumId = formData.selectedAlbum;
      // Create new song
      this.songService.addSong(this.artistId!, this.albumId!, formData).subscribe({
        next: () => this.sharedService.notify(this.artistId, this.albumId),
        error: (error) => console.error('Error creating album', error)
      }
      );
      this.artistId = null;
      this.albumId = null;
    }
  }
}
