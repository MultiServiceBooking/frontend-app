import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Reservation } from '../model/reservation.model';
import { Review } from '../model/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiHost}reviews`;

  constructor(private http: HttpClient) { }

  createReview(review: Review): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, review);
  }

  getHotelReviews(hotelId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hotel/` + hotelId);
  }

  updateReviewStatus(reviewId: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${reviewId}/${status}`, null);
  }

}
