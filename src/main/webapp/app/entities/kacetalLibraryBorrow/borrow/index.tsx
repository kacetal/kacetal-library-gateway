import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Borrow from './borrow';
import BorrowDetail from './borrow-detail';
import BorrowUpdate from './borrow-update';
import BorrowDeleteDialog from './borrow-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BorrowDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BorrowUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BorrowUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BorrowDetail} />
      <ErrorBoundaryRoute path={match.url} component={Borrow} />
    </Switch>
  </>
);

export default Routes;
