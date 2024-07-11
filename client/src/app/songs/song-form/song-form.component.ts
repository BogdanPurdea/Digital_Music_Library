import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../../services/song.service';
import { Album } from '../../models/album';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-song-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './song-form.component.html',
  styleUrl: './song-form.component.css'
})
export class SongFormComponent implements OnChanges{
  songForm!: FormGroup;
  @Input() artistId: string | null = null;
  @Input() album: Album | null = null;

  constructor(private formBuilder: FormBuilder, private songService: SongService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
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
      // Create new album
      this.songService.addSong(this.artistId!, this.album!._id, formData).subscribe({
        next: () => this.router.navigate([this.router.url]),
        error: (error) => console.error('Error creating album', error)}
      );
    }
  }
}
