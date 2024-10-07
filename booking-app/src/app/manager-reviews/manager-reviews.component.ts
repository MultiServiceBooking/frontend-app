import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { HotelService } from '../services/hotel.service';
import { Review, ReviewStatus } from '../model/review.model';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-manager-reviews',
  templateUrl: './manager-reviews.component.html',
  styleUrls: ['./manager-reviews.component.css']
})
export class ManagerReviewsComponent implements OnInit{
  user?: User;
  reviews: Review[] = [];
  usersMap: Map<string, User> = new Map();
  constructor(private authService: AuthService, private hotelService: HotelService, private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe({
      next: (user: User) => {
        this.user = user;
        console.log("Logged user:");
        console.log(user);
        this.loadReviews();
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  getUserById(userId: string): User | undefined {
    return this.usersMap.get(userId);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }

  loadReviews(): void 
  {
    this.reviewService.getHotelReviews(this.user?.hotelId.toString() || '').subscribe(
      (reviews) => {
        this.reviews = reviews.filter((review: Review) => review.reviewStatus === ReviewStatus.PENDING);
        console.log('Hotel reviews:', JSON.stringify(reviews, null, 2));
        this.reviews.forEach(review => {
          this.authService.getUserById(review.user_id).subscribe(user => {
            this.usersMap.set(review.user_id, user);
          });
        });
      (error: any) => {
        console.error('Error fetching reviews:', error);
      }
    }
    )
  }

  acceptReview(reviewId: string): void 
  {
    this.reviewService.updateReviewStatus(reviewId.toString(), 'accepted').subscribe({
      next: (response) => {
        console.log('Review updated successfully:', response);
        this.reviews = this.reviews.filter(review => review.id !== reviewId);
      },
      error: (error) => {
        console.error('Error updating review:', error);
      }
    });
  }

  rejectReview(reviewId: string): void 
  {
    this.reviewService.updateReviewStatus(reviewId.toString(), 'rejected').subscribe({
      next: (response) => {
        console.log('Review updated successfully:', response);
        this.reviews = this.reviews.filter(review => review.id !== reviewId);
      },
      error: (error) => {
        console.error('Error updating review:', error);
      }
    });
  }
}
