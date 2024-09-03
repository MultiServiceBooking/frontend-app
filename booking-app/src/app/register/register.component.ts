import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phoneNumber: string = '';
  policyAccepted: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (!this.policyAccepted) {
      alert('You must accept the Terms & Conditions');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      role: 'GUEST'
    };

    this.authService.register(userData).subscribe(
      response => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed:', error);
      }
    );
  }
}
