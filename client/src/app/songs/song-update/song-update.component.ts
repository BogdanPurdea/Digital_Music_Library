import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../../services/song.service';
import { SharedService } from '../../services/shared.service';
import { Artist } from '../../models/artist';
import { Album } from '../../models/album';

@Component({
  selector: 'app-song-update',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './song-update.component.html',
  styleUrl: './song-update.component.css'
})
export class SongUpdateComponent implements OnChanges {
  songForm!: FormGroup;
  @Input() artist: Artist | null = null;
  @Input() album: Album | null = null;
  @Input() songId: string | null = null;

  constructor(private formBuilder: FormBuilder, private songService: SongService, 
    private sharedService: SharedService) { }

  ngOnChanges(): void {
    this.initializeFormGroup();
  }
  initializeFormGroup(): void {
    this.songForm = this.formBuilder.group({
      title: ['', Validators.required],
      length: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.songForm.valid) {
      const formData = { ...this.songForm.value };
      // Update song
      this.songService.updateSong(this.artist!._id, this.album!._id, this.songId!, formData).subscribe({
        next: () => this.sharedService.notify(this.artist, this.album),
        error: (error) => console.error('Error creating album', error)}
      );
    }
  }
}
