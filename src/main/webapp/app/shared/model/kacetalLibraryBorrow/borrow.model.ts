import {BorrowStatus} from 'app/shared/model/enumerations/borrow-status.model';

export interface IBorrow {
  id?: number;
  bookId?: number;
  userId?: number;
  borrowDuration?: number;
  borrowStatus?: BorrowStatus;
  notificationType?: string;
  prolonged?: number;
}

export const defaultValue: Readonly<IBorrow> = {};
