import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SongService } from '../../services/song.service';
import { Album } from '../../models/album';
import { Artist } from '../../models/artist';
import { SharedService } from '../../services/shared.service';
import { SharedModule } from '../../_modules/shared.module';

@Component({
  selector: 'app-song-create',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './song-create.component.html',
  styleUrl: './song-create.component.css'
})
export class SongCreateComponent implements OnChanges{
  songForm!: FormGroup;
  @Input() artistId: string | null = null;
  @Input() albumId: string | null = null;

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
      // Create new song
      this.songService.addSong(this.artistId!, this.albumId!, formData).subscribe({
        next: () => this.sharedService.notify(this.artistId, this.albumId),
        error: (error) => console.error('Error creating album', error)}
      );
    }
  }
}
