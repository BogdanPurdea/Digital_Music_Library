import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { SharedService } from '../../services/shared.service';
import { SharedModule } from '../../_modules/shared.module';

@Component({
  selector: 'app-artist-update',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './artist-update.component.html',
  styleUrl: './artist-update.component.css'
})
export class ArtistUpdateComponent implements OnInit{
  artistForm!: FormGroup;
  @Input() artistId: string | null = null;

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
      // Update artist
      this.artistService.updateArtist(this.artistId!, formData).subscribe({
        next: () => this.sharedService.notify(null, null),
        error: (error) => console.error('Error creating artist', error)}
      );
    }
  }
}
