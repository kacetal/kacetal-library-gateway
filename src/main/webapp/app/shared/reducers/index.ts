import {combineReducers} from 'redux';
import {loadingBarReducer as loadingBar} from 'react-redux-loading-bar';

import locale, {LocaleState} from './locale';
import authentication, {AuthenticationState} from './authentication';
import applicationProfile, {ApplicationProfileState} from './application-profile';

import administration, {AdministrationState} from 'app/modules/administration/administration.reducer';
import userManagement, {UserManagementState} from 'app/modules/administration/user-management/user-management.reducer';
import register, {RegisterState} from 'app/modules/account/register/register.reducer';
import activate, {ActivateState} from 'app/modules/account/activate/activate.reducer';
import password, {PasswordState} from 'app/modules/account/password/password.reducer';
import settings, {SettingsState} from 'app/modules/account/settings/settings.reducer';
import passwordReset, {PasswordResetState} from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import address, {AddressState} from 'app/entities/address/address.reducer';
// prettier-ignore
import userSettings, {UserSettingsState} from 'app/entities/user-settings/user-settings.reducer';
// prettier-ignore
import borrow, {BorrowState} from 'app/entities/kacetalLibraryBorrow/borrow/borrow.reducer';
// prettier-ignore
import book, {BookState} from 'app/entities/kacetalLibraryBook/book/book.reducer';
// prettier-ignore
import author, {AuthorState} from 'app/entities/kacetalLibraryBook/author/author.reducer';
// prettier-ignore
import publisher, {PublisherState} from 'app/entities/kacetalLibraryBook/publisher/publisher.reducer';
// prettier-ignore
import stock, {StockState} from 'app/entities/kacetalLibraryStock/stock/stock.reducer';
// prettier-ignore
import notification, {NotificationState} from 'app/entities/kacetalLibraryNotification/notification/notification.reducer';

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly address: AddressState;
  readonly userSettings: UserSettingsState;
  readonly borrow: BorrowState;
  readonly book: BookState;
  readonly author: AuthorState;
  readonly publisher: PublisherState;
  readonly stock: StockState;
  readonly notification: NotificationState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  address,
  userSettings,
  borrow,
  book,
  author,
  publisher,
  stock,
  notification,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
