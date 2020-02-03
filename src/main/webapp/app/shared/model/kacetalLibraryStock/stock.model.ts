import {BookStockStatus} from 'app/shared/model/enumerations/book-stock-status.model';

export interface IStock {
  id?: number;
  name?: string;
  quantity?: number;
  bookStockStatus?: BookStockStatus;
}

export const defaultValue: Readonly<IStock> = {};
