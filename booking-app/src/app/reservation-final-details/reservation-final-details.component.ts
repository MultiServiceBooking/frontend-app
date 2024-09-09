import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../model/hotel.model';
import { Room } from '../model/room.model';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { HotelService } from '../services/hotel.service';
import { Reservation } from '../model/reservation.model';
import { Payment, PaymentStatus, PaymentMethod} from '../model/payment.model';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation-final-details',
  templateUrl: './reservation-final-details.component.html',
  styleUrls: ['./reservation-final-details.component.css']
})
export class ReservationFinalDetailsComponent implements OnInit{
  startDate: string = '';
  endDate: string = '';
  guestCount: number = 0;
  hotelId: number = 0;
  roomId: number = 0;
  hotel?: Hotel;
  user?: User;
  room?: Room;
  showcard: boolean = false;
  newReservation?: Reservation;
  roomPrice: number = 0;
  cardHolderName: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvc: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, 
    private reservationService: ReservationService, private hotelService: HotelService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
      this.guestCount = +params['guestCount'];
      this.hotelId = +params['hotelId'];
      this.roomId = +params['roomId'];
      console.log('Query Params:', this.startDate, this.endDate, this.guestCount, this.hotelId, this.roomId);
      this.loadData();
    });
  }

  onPaymentChange(value: string) {
    this.showcard = value === 'pay-now';
  }

  loadData(): void 
  {
    this.authService.getLoggedUser().subscribe({
      next: (user: User) => {
        this.user = user;
        console.log("Logged user:");
        console.log(user);
        this.loadHotel();
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  loadHotel(): void 
  {
    this.hotelService.getHotelById(this.hotelId).subscribe(
      (hotel) => {
        this.hotel = hotel;
        this.loadRoom();
        console.log('Hotel:', JSON.stringify(hotel, null, 2));
      },
      (error) => {
        console.error('Error fetching hotel details:', error);
      }
    );
  }
  
  loadRoom(): void 
  {
    this.hotelService.getRoomById(this.roomId).subscribe(
      (room) => {
        this.room = room;
        this.roomPrice = this.room.price;
        console.log('Room:', JSON.stringify(room, null, 2));
      },
      (error) => {
        console.error('Error fetching room details:', error);
      }
    );
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push('assets/star-filled.png'); 
    }
   /* for (let i = rating; i < 5; i++) {
      stars.push('assets/star-empty.png'); 
    }*/
    return stars;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
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

  generateConfirmationNumber(): string {
    return 'CONF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  redirectToNextFinalDetails(): void {
    if(this.user && this.room && this.room.price) {
      this.hotelService.createReservation(this.roomId, this.startDate, this.endDate, this.guestCount, this.user.id).subscribe(
        (reservation: Reservation) => {
          this.newReservation = reservation;  
          console.log('Reservation created successfully:', this.newReservation);
          
          const amount = this.roomPrice * this.getNumberOfNights(this.startDate, this.endDate);
          const lastFourDigits = this.cardNumber.slice(-4);
          
          const payment = new Payment(
            0, 
            '',
            amount,
            PaymentStatus.PENDING,
            this.newReservation.id,
            this.showcard ? PaymentMethod.CREDIT_CARD : PaymentMethod.PAYPAL, 
            'USD', 
            this.generateConfirmationNumber(), 
            this.showcard ? lastFourDigits : '', 
          );

          console.log('New payment: ' + JSON.stringify(payment, null, 2));

          this.reservationService.createPayment(payment, this.newReservation.id.toString()).subscribe(
            (payment: Payment) => {
              console.log('Payment created successfully:', payment);
              /*this.router.navigate(['completed-booking'], { 
                queryParams: { 
                  startDate: this.startDate, 
                  endDate: this.endDate, 
                  guestCount: this.guestCount,
                  hotelId: this.hotel?.id, 
                  roomId: this.room?.id 
                }
              });*/
            },
            error => {
              console.error('Error creating payment:', error);
            }
          );
        },
        error => {
          console.error('Error creating reservation:', error);
        }
      );
    }
  }

} 
