import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HotelService } from '../services/hotel.service';
import { ReservationService } from '../services/reservation.service';
import { Hotel } from '../model/hotel.model';
import { Reservation } from '../model/reservation.model';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Review, ReviewStatus } from '../model/review.model';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-reservation-review',
  templateUrl: './reservation-review.component.html',
  styleUrls: ['./reservation-review.component.css']
})
export class ReservationReviewComponent implements OnInit{
  user?: User;
  hotelId?: string;
  reservationId?: string;
  hotel?: Hotel;
  reservation?: Reservation;
  review: Review = {
    rating: 1,
    reviewDate: new Date().toISOString(), 
    user_id: '',
    reservation_id: '',
    hotel_id: '',
    reviewStatus: ReviewStatus.PENDING
  };
  constructor(
    private router: Router,
    private reviewService: ReviewService, private authService: AuthService, private route: ActivatedRoute, private hotelService: HotelService, private reservationService: ReservationService) {
  }

  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      this.hotelId = params.get('hotelId') || undefined;
      this.reservationId = params.get('reservationId') || undefined;
    });

    this.authService.getLoggedUser().subscribe({
      next: (user: User) => {
        this.user = user;
        this.review.user_id = this.user.id.toString();
        this.loadHotel();
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
    
  }

  loadHotel(): void 
  {
    this.hotelService.getHotelById(Number(this.hotelId)).subscribe({
      next: (hotel: Hotel) => {
        this.hotel = hotel;
        this.review.hotel_id = this.hotel.id.toString();
        this.loadReservation();
      },
      error: (error) => {
        console.error('Error fetching hotel:', error);
      }
    });
  }

  loadReservation(): void 
  {
    this.reservationService.getById(Number(this.reservationId)).subscribe({
      next: (reservation: Reservation) => {
        this.reservation = reservation;
        this.review.reservation_id = this.reservation.id.toString();
      },
      error: (error) => {
        console.error('Error fetching reservation:', error);
      }
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

  getFormattedDate(date?: string): string {
    return date ? this.formatDate(date) : '2000-01-01';
  }
  
  submitReview(): void {
    if (this.review.rating && this.review.user_id && this.review.reservation_id && this.review.hotel_id) {
      this.reviewService.createReview(this.review).subscribe({
        next: () => {
          console.log('Review submitted successfully');
          this.router.navigate(['hotel-details', this.hotelId]);
        },
        error: (error) => {
          console.error('Error submitting review:', error);
        }
      });
    } else {
      console.error('Please fill in all required fields');
    }
  }

  getNumberOfNights(startDate?: string, endDate?: string): number {
    if(startDate && endDate)
    {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const timeDiff = Math.abs(end.getTime() - start.getTime());
      const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

      return numberOfNights;
    }
    else
    {
      return 0;
    }
  }

  selectRating(rating: number): void {
    this.review.rating = rating;
    switch (rating) {
      case 2:
        this.review.comment = 'Poor';
        break;
      case 3:
        this.review.comment = 'Fair';
        break;
      case 4:
        this.review.comment = 'Good';
        break;
      case 5:
        this.review.comment = 'Excellent';
        break;
    }
  }
  
}
