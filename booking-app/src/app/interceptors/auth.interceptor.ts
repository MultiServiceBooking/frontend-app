import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userJson = localStorage.getItem('loggedUser');
    let authHeader = '';

    if (userJson) {
      const user = JSON.parse(userJson);
      const credentials = btoa(`${user.username}:${user.password}`);
      authHeader = `Basic ${credentials}`;
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: authHeader
      }
    });

    return next.handle(authReq);
  }
}
