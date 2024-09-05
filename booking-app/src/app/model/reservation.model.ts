export interface Reservation {
    id: number;
    startDate: string; 
    endDate: string;   
    reservationDate: string; 
    guestCount: number;
    reservationStatus: string; 
    userId: number;
    roomId: number;
    paymentId: number | null; 
  }
  