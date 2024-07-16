import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../_modules/shared.module';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
