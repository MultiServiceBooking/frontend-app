import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../model/hotel.model';
import { Room } from '../model/room.model';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit{
  startDate: string = '';
  endDate: string = '';
  guestCount: number = 0;
  hotelId: number = 0;
  roomId: number = 0;
  hotel?: Hotel;
  user?: User;
  room?: Room;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private hotelService: HotelService) { }

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

  redirectToNextFinalDetails(): void 
  {
    this.router.navigate(['reservation-final-details'], { 
      queryParams: { startDate: this.startDate, endDate: this.endDate, guestCount: this.guestCount,
        hotelId: this.hotel?.id, roomId: this.room?.id
       }}); 
  }

}
