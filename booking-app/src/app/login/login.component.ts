import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, 
              private authService: AuthService
  ) {
  }

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.message === 'Login successful') { 
          localStorage.setItem('loggedUser', JSON.stringify({ username: this.username, password: this.password }));
          this.router.navigate(['/']).then(() => {
            window.location.reload(); 
          });
        } else {
          this.errorMessage = response.error.error;
        }
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 401:
            this.errorMessage = errorResponse.error?.errorMessage || 'Incorrect password. Try again.';
            break;
          case 404:
            this.errorMessage = errorResponse.error?.errorMessage || 'User with this email address does not exist.';
            break;
          default:
            this.errorMessage = errorResponse.error?.errorMessage || 'An unexpected error occurred.';
            break;
        }
      }
    });
  }

}