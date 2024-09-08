import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFinalDetailsComponent } from './reservation-final-details.component';

describe('ReservationFinalDetailsComponent', () => {
  let component: ReservationFinalDetailsComponent;
  let fixture: ComponentFixture<ReservationFinalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationFinalDetailsComponent]
    });
    fixture = TestBed.createComponent(ReservationFinalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
