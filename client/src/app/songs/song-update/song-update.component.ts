import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-song-update',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './song-update.component.html',
  styleUrl: './song-update.component.css'
})
export class SongUpdateComponent implements OnChanges {
  songForm!: FormGroup;
  @Input() artistId: string | null = null;
  @Input() albumId: string | null = null;
  @Input() songId: string | null = null;

  constructor(private formBuilder: FormBuilder, private songService: SongService,
    private route: ActivatedRoute, private router: Router) { }

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
      this.songService.updateSong(this.artistId!, this.albumId!, this.songId!, formData).subscribe({
        next: () => this.router.navigate([this.router.url]),
        error: (error) => console.error('Error creating album', error)}
      );
    }
  }
}
