import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Reservation } from '../model/reservation.model';
import { AuthService } from '../services/auth.service';
import { ReservationService } from '../services/reservation.service';
import { HotelService } from '../services/hotel.service';
import { Hotel } from '../model/hotel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrls: ['./guest-reservations.component.css']
})
export class GuestReservationsComponent implements OnInit{
  loggedUser?: User;
  reservations: Reservation[] = [];
  hotels: Map<number, Hotel> = new Map();
  constructor(private authService: AuthService, private reservationService: ReservationService, private hotelService: HotelService,
    private router: Router
  ) {}

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
        this.loadHotels();
      },
      error: (error) => {
        console.error('Error fetching reservations:', error);
      }
    });
  }

  loadHotels(): void {
    this.reservations.forEach(reservation => {
      this.hotelService.getHotelByReservationId(reservation.id).subscribe({
        next: (hotel: Hotel) => {
          this.hotels.set(reservation.id, hotel);
        },
        error: (error) => {
          console.error('Error fetching hotel:', error);
        }
      });
    });
  }

  trimAddress(address: string): string {
    const commaIndex = address.indexOf(',');
    if (commaIndex !== -1) {
      return address.substring(commaIndex + 1).trim();
    }
    return address;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }
  
  capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  review(hotelId: number, reservationId: number): void {
    this.router.navigate(['/reservation-review', hotelId, reservationId]);
  }

}
