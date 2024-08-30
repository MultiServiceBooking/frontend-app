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
          this.router.navigate(['/']); 
        } else {
          this.errorMessage = response.error || 'Unexpected response from server';
        }
      },
      error: (errorResponse) => {
        this.errorMessage = errorResponse.error?.error || 'An error occurred';
        console.log(errorResponse);
      }
    });
  }
  

}