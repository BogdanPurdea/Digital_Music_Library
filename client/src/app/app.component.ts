import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArtistListComponent } from './artist-list/artist-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ArtistListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Digital_Music_Library_Client_App';
}
