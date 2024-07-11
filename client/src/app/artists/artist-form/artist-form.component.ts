import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artist-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './artist-form.component.html',
  styleUrl: './artist-form.component.css'
})
export class ArtistFormComponent implements OnInit {
  artistForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private artistService: ArtistService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.initializeFormGroup();
  }
  initializeFormGroup(): void {
    this.artistForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.artistForm.valid) {
      const formData = { ...this.artistForm.value };
      // Create new artist
      this.artistService.createArtist(formData).subscribe({
        next: () => this.router.navigate([this.router.url]),
        error: (error) => console.error('Error creating artist', error)}
      );
    }
  }
}

