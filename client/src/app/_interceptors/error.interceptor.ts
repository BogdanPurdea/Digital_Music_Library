import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, retry, throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      switch (err.status) {
        case 0:
          console.log("Network error");
          break;
        case 400:
          console.log("400 Bad Request. Server cannot process the request");
          break;
        case 401:
          console.log("401 Authentication Error");
          break;
        case 404:
          router.navigateByUrl('/not-found');
          break;
        case 500:
          const navigationExtras: NavigationExtras = {state: {error: err.error}};
          router.navigateByUrl('/server-error', navigationExtras);
          console.log("500 Internal Server Error");
          break;
        default:
          console.log(err.url);
          console.log(err.status + ", " + err.statusText);
          break;
      }
      return throwError(() => new Error('An error occurred. Please try again later.'));
    })
  );
}
