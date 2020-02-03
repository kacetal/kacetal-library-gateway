import {Moment} from 'moment';
import {IAuthor} from 'app/shared/model/kacetalLibraryBook/author.model';
import {IPublisher} from 'app/shared/model/kacetalLibraryBook/publisher.model';

export interface IBook {
  id?: number;
  isbn?: string;
  title?: string;
  publishDate?: Moment;
  coverContentType?: string;
  cover?: any;
  authors?: IAuthor[];
  publisher?: IPublisher;
}

export const defaultValue: Readonly<IBook> = {};
