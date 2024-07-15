import { Component, Input, OnChanges } from '@angular/core';
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
export class AlbumCreateComponent implements OnChanges {
  albumForm!: FormGroup;
  @Input() artistId: string | null = null;

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
      // Create new album
      this.albumService.addAlbum(this.artistId!, formData).subscribe({
        next: () => this.sharedService.notify(this.artistId, null),
        error: (error) => console.error('Error creating album', error)}
      );
    }
  }
}
