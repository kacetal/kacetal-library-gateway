import {IBook} from 'app/shared/model/kacetalLibraryBook/book.model';

export interface IAuthor {
  id?: number;
  firstName?: string;
  lastName?: string;
  pseudonym?: string;
  books?: IBook[];
}

export const defaultValue: Readonly<IAuthor> = {};
