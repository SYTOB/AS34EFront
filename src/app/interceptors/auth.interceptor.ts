import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
  ) {
  }

  get token() {
    return localStorage.getItem('token')
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Clone the request object
    let newReq = req.clone();

    let requestUrl = newReq.url;

    // Add URL API
    requestUrl = requestUrl.replace('@api', environment.API);

    // Update req URL
    newReq = newReq.clone({ url: requestUrl });


    // If the access token didn't expire, add the Authorization header.
    if (this.token) {

      newReq = newReq.clone({
        headers: newReq.headers.set('Authorization', 'Bearer ' + this.token)
      });

    }

    return next.handle(newReq);


  }

}
