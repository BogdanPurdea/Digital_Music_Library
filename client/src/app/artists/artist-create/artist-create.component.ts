import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { SharedService } from '../../services/shared.service';
import { SharedModule } from '../../_modules/shared.module';

@Component({
  selector: 'app-artist-create',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './artist-create.component.html',
  styleUrl: './artist-create.component.css'
})
export class ArtistCreateComponent implements OnInit {
  artistForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private artistService: ArtistService,
    private sharedService: SharedService) { }

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
        next: () => this.sharedService.notify(null, null),
        error: (error) => console.error('Error creating artist', error)}
      );
    }
  }
}

