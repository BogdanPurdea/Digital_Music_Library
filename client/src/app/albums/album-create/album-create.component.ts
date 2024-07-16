import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlbumService } from '../../services/album.service';
import { Artist } from '../../models/artist';
import { SharedService } from '../../services/shared.service';
import { SharedModule } from '../../_modules/shared.module';

@Component({
  selector: 'app-album-create',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './album-create.component.html',
  styleUrl: './album-create.component.css',
})
export class AlbumCreateComponent implements OnInit, OnChanges {
  albumForm!: FormGroup;
  @Input() artistId: string | null = null;
  artists: Artist[] | null = null;

  constructor(private formBuilder: FormBuilder, private albumService: AlbumService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.initializeFormGroup();
    if (this.artistId === null)
      this.albumService.getArtistsFromAlbums().subscribe({
        next: (artistResults) => {
          this.artists = artistResults;
        },
        error: (error) => {
          console.error('Error loading artists', error);
        }
      });
    else {
      this.albumForm.patchValue({ selectedArtist: this.artistId})
    }
  }

  ngOnChanges(): void {
    this.initializeFormGroup();
  }

  initializeFormGroup(): void {
    this.albumForm = this.formBuilder.group({
      selectedArtist: ['', Validators.required],
      title: ['', Validators.required],
      description: ['']
    });
  }
  onSubmit(): void {
    if (this.albumForm.valid) {
      const formData = { ...this.albumForm.value };      
      this.artistId = formData.selectedArtist;
      // Create new album
      this.albumService.addAlbum(this.artistId!, formData).subscribe({
        next: () => this.sharedService.notify(this.artistId, null),
        error: (error) => console.error('Error creating album', error)
      }
      );
      this.artistId = null;
    }
  }
}
