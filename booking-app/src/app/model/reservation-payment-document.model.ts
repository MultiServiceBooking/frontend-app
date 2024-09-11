export interface ReservationPaymentDocument {
    id?: string; 
    reservationId: number;
    paymentId: number;
    reservationStartDate: string; 
    reservationEndDate: string;
    reservationDate: string;
    guestCount: number;
    reservationStatus: string;
    userName: string;
    roomDetails: string;
    paymentAmount: number;
    paymentStatus: string;
    paymentMethod: string;
    currency: string;
    confirmationNumber: string;
    cardLastFourDigits: string;
  }
  