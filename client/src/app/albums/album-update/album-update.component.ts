import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { SharedService } from '../../services/shared.service';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-album-update',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
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
