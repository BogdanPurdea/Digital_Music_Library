import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Artist } from '../../models/artist';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-album-create',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './album-create.component.html',
  styleUrl: './album-create.component.css',
})
export class AlbumCreateComponent implements OnChanges {
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
        next: () => this.router.navigate([this.route]),
        error: (error) => console.error('Error creating album', error)}
      );
    }
  }
}
