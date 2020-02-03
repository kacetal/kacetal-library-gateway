import {IUserSettings} from 'app/shared/model/user-settings.model';

export interface IAddress {
  id?: number;
  addressLine1?: string;
  addressLine2?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  userSettings?: IUserSettings[];
}

export const defaultValue: Readonly<IAddress> = {};
