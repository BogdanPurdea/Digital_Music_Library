import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SongService } from '../../services/song.service';
import { SharedService } from '../../services/shared.service';
import { Artist } from '../../models/artist';
import { Album } from '../../models/album';
import { SharedModule } from '../../_modules/shared.module';

@Component({
  selector: 'app-song-update',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './song-update.component.html',
  styleUrl: './song-update.component.css'
})
export class SongUpdateComponent implements OnChanges {
  songForm!: FormGroup;
  @Input() artistId: string | null = null;
  @Input() albumId: string | null = null;
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
      this.songService.updateSong(this.artistId!, this.albumId!, this.songId!, formData).subscribe({
        next: () => this.sharedService.notify(this.artistId, this.albumId),
        error: (error) => console.error('Error creating album', error)}
      );
    }
  }
}
