import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { HttpParams } from '@angular/common/http';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiHost}auth`;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { email: username, password: password };
    return this.http.post<any>(`${this.apiUrl}/login`, body);
  }

  register(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(`${this.apiUrl}/register`, userData);
  }


  getLoggedUser(): Observable<User> {
    const userJson = localStorage.getItem('loggedUser');
    if (userJson) {
      const loggedUser = JSON.parse(userJson);
      const username = loggedUser.username; 
      return this.http.get<User>(`${environment.apiHost}users/find/${username}`);
    } else {
      return new Observable<User>(observer => {
        observer.error('User not found in localStorage');
      });
    }
  }
  
  
}
