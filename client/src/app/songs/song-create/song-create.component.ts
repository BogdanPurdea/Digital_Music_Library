import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../../services/song.service';
import { Album } from '../../models/album';
import { Artist } from '../../models/artist';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-song-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './song-create.component.html',
  styleUrl: './song-create.component.css'
})
export class SongCreateComponent implements OnChanges{
  songForm!: FormGroup;
  @Input() artistId: string | null = null;
  @Input() album: Album | null = null;

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
      // Create new song
      this.songService.addSong(this.artistId!, this.album!._id, formData).subscribe({
        next: () => this.router.navigate([this.router.url]),
        error: (error) => console.error('Error creating album', error)}
      );
    }
  }
}
