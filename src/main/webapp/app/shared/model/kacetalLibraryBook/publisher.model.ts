import {IBook} from 'app/shared/model/kacetalLibraryBook/book.model';

export interface IPublisher {
  id?: number;
  name?: string;
  books?: IBook[];
}

export const defaultValue: Readonly<IPublisher> = {};
