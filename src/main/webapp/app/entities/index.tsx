import React from 'react';
import {Switch} from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Address from './address';
import UserSettings from './user-settings';
import Borrow from './kacetalLibraryBorrow/borrow';
import Book from './kacetalLibraryBook/book';
import Author from './kacetalLibraryBook/author';
import Publisher from './kacetalLibraryBook/publisher';
import Stock from './kacetalLibraryStock/stock';
import Notification from './kacetalLibraryNotification/notification';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({match}) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}address`} component={Address}/>
      <ErrorBoundaryRoute path={`${match.url}user-settings`} component={UserSettings}/>
      <ErrorBoundaryRoute path={`${match.url}borrow`} component={Borrow}/>
      <ErrorBoundaryRoute path={`${match.url}book`} component={Book}/>
      <ErrorBoundaryRoute path={`${match.url}author`} component={Author}/>
      <ErrorBoundaryRoute path={`${match.url}publisher`} component={Publisher}/>
      <ErrorBoundaryRoute path={`${match.url}stock`} component={Stock}/>
      <ErrorBoundaryRoute path={`${match.url}notification`} component={Notification}/>
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
