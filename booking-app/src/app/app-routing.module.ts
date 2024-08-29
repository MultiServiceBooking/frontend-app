import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';

const routes: Routes = [
  { path: 'navbar', component: NavbarComponent},
  {path:'login', component: LoginComponent}, 
  {path:'', component: HomepageComponent},
  { path: 'hotel-details/:id', component: HotelDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
