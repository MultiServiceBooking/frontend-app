import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { RegisterComponent } from './register/register.component';
import { GuestReservationsComponent } from './guest-reservations/guest-reservations.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ReservationReviewComponent } from './reservation-review/reservation-review.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationFinalDetailsComponent } from './reservation-final-details/reservation-final-details.component';
import { CompletedBookingComponent } from './completed-booking/completed-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomepageComponent,
    HotelDetailsComponent,
    RegisterComponent,
    GuestReservationsComponent,
    ReservationReviewComponent,
    ReservationDetailsComponent,
    ReservationFinalDetailsComponent,
    CompletedBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
