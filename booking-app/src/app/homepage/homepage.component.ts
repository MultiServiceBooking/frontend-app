import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../services/hotel.service';
import { Hotel } from '../model/hotel.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  hotels: Hotel[] = [];

  constructor(private router: Router, private hotelService: HotelService) { 

  }

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe(
      (hotels) => {
        this.hotels = hotels;
        console.log('Hotels:', hotels); 
      },
      (error) => {
        console.error('Error fetching hotels:', error);
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

  viewHotelDetails(hotelId: number): void {
    this.router.navigate(['/hotel-details', hotelId]);
  }
}
