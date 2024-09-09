import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Reservation } from '../model/reservation.model';
import { Payment } from '../model/payment.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = `${environment.apiHost}reservations`;
  private paymentUrl = `${environment.apiHost}payments`;

  constructor(private http: HttpClient) { }

  getAll(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/user/${userId}`);
  }

  getById(reservationId: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${reservationId}`);
  }

  createPayment(payment: Payment, reservationId: string): Observable<Payment> {
    return this.http.post<Payment>(`${this.paymentUrl}/${reservationId}`, payment);
  }
}
