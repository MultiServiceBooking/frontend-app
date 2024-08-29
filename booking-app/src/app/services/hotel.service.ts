import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Room } from '../model/room.model';
import { Hotel } from '../model/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = `${environment.apiHost}relational/hotels`; 
  private searchUrl = `${environment.apiHost}relational/rooms/search`;
  private reservationsUrl = `${environment.apiHost}relational/reservations`;

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
    return this.http.post<any>(`${this.reservationsUrl}/create`, null, {
      params: {
        roomId: roomId.toString(),
        startDate: startDate,
        endDate: endDate,
        guestCount: guestCount.toString()
      }
    });
  }
}
