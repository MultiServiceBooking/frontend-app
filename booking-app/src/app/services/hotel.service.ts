import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Room } from '../model/room.model';
import { Hotel } from '../model/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = `${environment.apiHost}hotels`; 
  private searchUrl = `${environment.apiHost}rooms/search`;
  private reservationsUrl = `${environment.apiHost}reservations`;

  constructor(private http: HttpClient) { }

  getHotels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRoomsByHotelId(hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/${hotelId}/rooms`);
  }

  getHotelById(hotelId: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/${hotelId}`);
  }

  searchAvailableRooms(guestCount: number, startDate: string, endDate: string, hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.searchUrl}?guestCount=${guestCount}&startDate=${startDate}&endDate=${endDate}&hotelId=${hotelId}`);
  }

  createReservation(roomId: number, startDate: string, endDate: string, guestCount: number): Observable<any> {
    const params = new HttpParams()
      .set('roomId', roomId.toString())
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('guestCount', guestCount.toString());

    return this.http.post<any>(`${this.reservationsUrl}/create`, null, { params });
  }

  searchHotels(address?: string, startDate?: string, endDate?: string, numberOfGuests?: number): Observable<Hotel[]> {
    let params = new HttpParams();
    if (address) params = params.set('address', address);
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    if (numberOfGuests != null) params = params.set('numberOfGuests', numberOfGuests.toString());

    return this.http.get<Hotel[]>(`${this.apiUrl}/search`, { params });
  }
  
}
