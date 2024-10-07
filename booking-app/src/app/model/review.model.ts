export enum ReviewStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export interface Review {
    id?: string; 
    rating: number;
    comment?: string; 
    good_comment?: string;
    bad_comment?: string; 
    reviewDate: string;
    user_id: string;
    reservation_id: string;
    hotel_id: string;
    reviewStatus: ReviewStatus;
  }
  