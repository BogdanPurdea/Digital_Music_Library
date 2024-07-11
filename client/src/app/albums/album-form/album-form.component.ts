import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-album-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './album-form.component.html',
  styleUrl: './album-form.component.css'
})
export class AlbumFormComponent implements OnChanges {
  albumForm!: FormGroup;
  @Input() artist: Artist | null = null;

  constructor(private formBuilder: FormBuilder, private albumService: AlbumService,
    private route: ActivatedRoute, private router: Router) { }

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
      this.albumService.addAlbum(this.artist?._id!, formData).subscribe({
        next: () => this.router.navigate([this.router.url]),
        error: (error) => console.error('Error creating album', error)}
      );
    }
  }
}
