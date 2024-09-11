import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { ChangePasswordDto } from '../model/change-password.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit{
  user?: User;
  showChangePassword: boolean = false;
  oldPassword: string = '';
  errorMessage: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe({
      next: (user: User) => {
        this.user = user;
        console.log("Logged user:");
        console.log(user);
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  showChange(): void 
  {
    this.showChangePassword = true;
  }

  updateUser(): void {
    if (this.user) {
      this.authService.updateUser(this.user.id!.toString(), this.user).subscribe(
        updatedUser => {
          console.log('User updated successfully', updatedUser);
          this.router.navigate(['']);
        },
        error => {
          console.error('Error updating user', error);
        }
      );
    }
  }

  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
    } else if (this.oldPassword !== this.user?.password) {
      this.errorMessage = 'Incorrect old password. Please try again.';
    } else {
      const changePasswordDto: ChangePasswordDto = {
        email: this.user?.email!,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };

      this.authService.changePassword(changePasswordDto).subscribe(
        response => {
          console.log('Password changed successfully', response);
          this.errorMessage = '';
          localStorage.removeItem('loggedUser');
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error changing password', error);
          this.errorMessage = 'An error occurred while changing the password.';
        }
      );
    }  }

}
