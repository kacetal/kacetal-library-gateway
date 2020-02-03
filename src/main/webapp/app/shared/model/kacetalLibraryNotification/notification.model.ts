import {Moment} from 'moment';
import {NotificationType} from 'app/shared/model/enumerations/notification-type.model';

export interface INotification {
  id?: number;
  sentDate?: Moment;
  format?: NotificationType;
  details?: string;
  userId?: number;
  bookId?: number;
}

export const defaultValue: Readonly<INotification> = {};
