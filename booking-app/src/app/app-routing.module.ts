import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { RegisterComponent } from './register/register.component';
import { GuestReservationsComponent } from './guest-reservations/guest-reservations.component';
import { ReservationReviewComponent } from './reservation-review/reservation-review.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationFinalDetailsComponent } from './reservation-final-details/reservation-final-details.component';
import { CompletedBookingComponent } from './completed-booking/completed-booking.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { ManagerReviewsComponent } from './manager-reviews/manager-reviews.component';

const routes: Routes = [
  { path: 'navbar', component: NavbarComponent},
  { path:'login', component: LoginComponent}, 
  { path: '', component: HomepageComponent},
  { path: 'hotel-details/:id', component: HotelDetailsComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'reservations', component: GuestReservationsComponent},
  { path: 'reservation-review/:hotelId/:reservationId', component: ReservationReviewComponent},
  { path: 'reservation-details', component: ReservationDetailsComponent},
  { path: 'reservation-final-details', component: ReservationFinalDetailsComponent},
  { path: 'completed-booking', component: CompletedBookingComponent},
  { path: 'user-account', component: UserAccountComponent},
  { path: 'manager-reviews', component: ManagerReviewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
