import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { RegisterComponent } from './register/register.component';
import { GuestReservationsComponent } from './guest-reservations/guest-reservations.component';

const routes: Routes = [
  { path: 'navbar', component: NavbarComponent},
  { path:'login', component: LoginComponent}, 
  { path: '', component: HomepageComponent},
  { path: 'hotel-details/:id', component: HotelDetailsComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'reservations', component: GuestReservationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
