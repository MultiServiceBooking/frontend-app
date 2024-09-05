import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Reservation } from '../model/reservation.model';
import { AuthService } from '../services/auth.service';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrls: ['./guest-reservations.component.css']
})
export class GuestReservationsComponent implements OnInit{
  loggedUser?: User;
  reservations: Reservation[] = [];
  constructor(private authService: AuthService, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe({
      next: (user: User) => {
        console.log("Logged user:");
        console.log(user);
        this.getAllReservations(user.id);
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  getAllReservations(userId: number): void {
    this.reservationService.getAll(userId).subscribe({
      next: (reservations: Reservation[]) => {
        this.reservations = reservations;
        console.log('User Reservations:', reservations);
      },
      error: (error) => {
        console.error('Error fetching reservations:', error);
      }
    });
  }
}
