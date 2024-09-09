import { Reservation } from "./reservation.model";

export enum PaymentMethod {
    CREDIT_CARD = 'CREDIT_CARD',
    ON_PROPERTY = 'ON_PROPERTY',
    PAYPAL = 'PAYPAL'
}
  
export enum PaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}
  
export class Payment {
    id: number;
    paymentDate: string; // Koristimo string za ISO 8601 format
    amount: number;
    paymentStatus: PaymentStatus;
    reservationId: number;
    paymentMethod: PaymentMethod;
    currency: string;
    confirmationNumber: string;
    cardLastFourDigits: string;

    constructor(
      id: number,
      paymentDate: string, // Koristimo string za ISO 8601 format
      amount: number,
      paymentStatus: PaymentStatus,
      reservationId: number,
      paymentMethod: PaymentMethod,
      currency: string,
      confirmationNumber: string,
      cardLastFourDigits: string
    ) {
      this.id = id;
      this.paymentDate = paymentDate;
      this.amount = amount;
      this.paymentStatus = paymentStatus;
      this.reservationId = reservationId;
      this.paymentMethod = paymentMethod;
      this.currency = currency;
      this.confirmationNumber = confirmationNumber;
      this.cardLastFourDigits = cardLastFourDigits;
    }
}
