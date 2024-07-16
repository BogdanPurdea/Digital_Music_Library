import { Component } from '@angular/core';
import { SharedModule } from '../_modules/shared.module';
import { TestErrorsComponent } from '../errors/test-errors/test-errors.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, TestErrorsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
