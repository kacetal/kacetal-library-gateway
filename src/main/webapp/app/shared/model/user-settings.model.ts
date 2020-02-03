import {IUser} from 'app/shared/model/user.model';
import {IAddress} from 'app/shared/model/address.model';

export interface IUserSettings {
  id?: number;
  avatarContentType?: string;
  avatar?: any;
  mobilePhone?: string;
  borrowLimit?: number;
  user?: IUser;
  addresses?: IAddress[];
}

export const defaultValue: Readonly<IUserSettings> = {};
