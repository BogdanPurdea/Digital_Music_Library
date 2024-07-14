import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlbumService } from '../../services/album.service';
import { SharedService } from '../../services/shared.service';
import { Artist } from '../../models/artist';
import { SharedModule } from '../../_modules/shared.module';

@Component({
  selector: 'app-album-update',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './album-update.component.html',
  styleUrl: './album-update.component.css'
})
export class AlbumUpdateComponent implements OnChanges{
  albumForm!: FormGroup;
  @Input() artist: Artist | null = null;
  @Input() albumId: string | null = null;

  constructor(private formBuilder: FormBuilder, private albumService: AlbumService,
    private sharedService: SharedService) { }

  ngOnChanges(): void {
    this.initializeFormGroup();
  }

  initializeFormGroup(): void {
    this.albumForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    });
  }
  onSubmit(): void {
    if (this.albumForm.valid) {
      const formData = { ...this.albumForm.value };
      //Update album
      this.albumService.updateAlbum(this.artist?._id!, this.albumId!, formData).subscribe({
        next: () => this.sharedService.notify(this.artist, null),
        error: (error) => console.error('Error creating album', error)}
      );
    }
  }
}
