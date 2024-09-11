import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls:[ './navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?: User;
  constructor(
    private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void{
    this.authService.getLoggedUser().subscribe({
      next: (user: User) => {
        console.log("Logged user:");
        console.log(user);
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
    
  }
    
  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  logout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/']);
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  redirectToReservations() {
    this.router.navigate(['/reservations']);
  }

  redirectToManageAccount() {
    this.router.navigate(['/user-account']);
  }

  isLoggedUser(): boolean {
    const userJson = localStorage.getItem('loggedUser');
    return userJson !== null; 
  }
  

}
