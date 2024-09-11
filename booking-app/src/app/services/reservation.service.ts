import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Reservation } from '../model/reservation.model';
import { Payment } from '../model/payment.model';
import { ReservationPaymentDocument } from '../model/reservation-payment-document.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = `${environment.apiHost}reservations`;
  private paymentUrl = `${environment.apiHost}payments`;
  private documentUrl = `${environment.apiHost}documents`;
  private sendDocumentUrl = `${environment.apiHost}documents/sendDocument`;

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

  createReservationPaymentDocument(document: ReservationPaymentDocument): Observable<ReservationPaymentDocument> {
    return this.http.post<ReservationPaymentDocument>(this.documentUrl, document);
  }

  sendDocument(email: string, documentId: string): Observable<string> {
    const params = new HttpParams()
      .set('email', email)
      .set('documentId', documentId);

    return this.http.post<string>(this.sendDocumentUrl, null, { params });
  }
}
