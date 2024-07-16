import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  get404Error() {
    this.http.get(this.baseUrl + '/not-found').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }
  get400Error() {
    this.http.get(this.baseUrl + '/bad-request').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }
  get500Error() {
    this.http.get(this.baseUrl + '/server-error').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }
}
