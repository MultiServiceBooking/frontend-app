import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../model/room.model';
import { Hotel } from '../model/hotel.model';
import { Review } from '../model/review.model';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit{
  rooms: Room[] = [];
  hotel?: Hotel;
  guestCount: number = 1;
  startDate: string = '';
  endDate: string = '';
  hotelId: number = 0;
  reviews: Review[] = [];
  currentReviewIndex: number = 0;


  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.hotelId = +params.get('id')!;
  
      this.hotelService.getRoomsByHotelId(this.hotelId).subscribe(
        (rooms) => {
          this.rooms = rooms;
          console.log('Rooms:', JSON.stringify(rooms, null, 2));
        },
        (error) => {
          console.error('Error fetching hotel rooms:', error);
        }
      );
  
      this.hotelService.getHotelById(this.hotelId).subscribe(
        (hotel) => {
          this.hotel = hotel;
          console.log('Hotel:', JSON.stringify(hotel, null, 2));
        },
        (error) => {
          console.error('Error fetching hotel details:', error);
        }
      );
    });
  
    this.route.queryParams.subscribe(params => {
      this.startDate = params['startDate'] || '';
      this.endDate = params['endDate'] || '';
      this.guestCount = +params['guestCount'] || 1;
  
      console.log('Received startDate:', this.startDate);
      console.log('Received endDate:', this.endDate);
      console.log('Received guestCount:', this.guestCount);
    });

    this.hotelService.searchAvailableRooms(this.guestCount, this.startDate, this.endDate, this.hotelId).subscribe(
      (rooms) => {
        this.rooms = rooms;
        console.log('Filtered rooms:', JSON.stringify(rooms, null, 2));
      },
      (error) => {
        console.error('Error searching rooms:', error);
      }
    );

    this.reviewService.getHotelReviews(this.hotelId.toString()).subscribe(
      (reviews) => {
        this.reviews = reviews;
        console.log('Hotel reviews:', JSON.stringify(reviews, null, 2));
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
  

  searchRooms(): void {
    this.hotelService.searchAvailableRooms(this.guestCount, this.startDate, this.endDate, this.hotelId).subscribe(
      (rooms) => {
        this.rooms = rooms;
        console.log('Filtered rooms:', JSON.stringify(rooms, null, 2));
      },
      (error) => {
        console.error('Error searching rooms:', error);
      }
    );
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push('assets/star-filled.png'); 
    }
    for (let i = rating; i < 5; i++) {
      stars.push('assets/star-empty.png'); 
    }
    return stars;
  }

  createReservation(roomId: number) {
    this.hotelService.createReservation(roomId, this.startDate, this.endDate, this.guestCount).subscribe(
      response => {
        console.log('Reservation created successfully:', response);
      },
      error => {
        console.error('Error creating reservation:', error);
      }
    );
  }

  showPreviousReview(): void {
    if (this.reviews.length > 0) {
      this.currentReviewIndex = (this.currentReviewIndex > 0) ? this.currentReviewIndex - 1 : this.reviews.length - 1;
    }
  }

  showNextReview(): void {
    if (this.reviews.length > 0) {
      this.currentReviewIndex = (this.currentReviewIndex < this.reviews.length - 1) ? this.currentReviewIndex + 1 : 0;
    }
  }
}
