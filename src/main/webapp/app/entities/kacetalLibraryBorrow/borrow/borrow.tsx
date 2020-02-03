import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Table} from 'reactstrap';
import {getSortState, JhiItemCount, JhiPagination, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities} from './borrow.reducer';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';

export interface IBorrowProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const Borrow = (props: IBorrowProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  useEffect(() => {
    getAllEntities();
  }, []);

  const sortEntities = () => {
    getAllEntities();
    props.history.push(
      `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    );
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  const {borrowList, match, totalItems} = props;
  return (
    <div>
      <h2 id="borrow-heading">
        <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.home.title">Borrows</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus"/>
          &nbsp;
          <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.home.createLabel">Create new
            Borrow</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {borrowList && borrowList.length > 0 ? (
          <Table responsive>
            <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('bookId')}>
                <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.bookId">Book
                  Id</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('userId')}>
                <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.userId">User
                  Id</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('borrowDuration')}>
                <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.borrowDuration">Borrow
                  Duration</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('borrowStatus')}>
                <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.borrowStatus">Borrow
                  Status</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('notificationType')}>
                <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.notificationType">Notification
                  Type</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('prolonged')}>
                <Translate
                  contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.prolonged">Prolonged</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {borrowList.map((borrow, i) => (
              <tr key={`entity-${i}`}>
                <td>
                  <Button tag={Link} to={`${match.url}/${borrow.id}`} color="link" size="sm">
                    {borrow.id}
                  </Button>
                </td>
                <td>{borrow.bookId}</td>
                <td>{borrow.userId}</td>
                <td>{borrow.borrowDuration}</td>
                <td>
                  <Translate contentKey={`kacetalLibraryGatewayApp.BorrowStatus.${borrow.borrowStatus}`}/>
                </td>
                <td>{borrow.notificationType}</td>
                <td>{borrow.prolonged}</td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${borrow.id}`} color="info" size="sm">
                      <FontAwesomeIcon icon="eye"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`${match.url}/${borrow.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                      color="primary"
                      size="sm"
                    >
                      <FontAwesomeIcon icon="pencil-alt"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`${match.url}/${borrow.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                      color="danger"
                      size="sm"
                    >
                      <FontAwesomeIcon icon="trash"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        ) : (
          <div className="alert alert-warning">
            <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.home.notFound">No Borrows
              found</Translate>
          </div>
        )}
      </div>
      <div className={borrowList && borrowList.length > 0 ? '' : 'd-none'}>
        <Row className="justify-content-center">
          <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage}
                        i18nEnabled/>
        </Row>
        <Row className="justify-content-center">
          <JhiPagination
            activePage={paginationState.activePage}
            onSelect={handlePagination}
            maxButtons={5}
            itemsPerPage={paginationState.itemsPerPage}
            totalItems={props.totalItems}
          />
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = ({borrow}: IRootState) => ({
  borrowList: borrow.entities,
  totalItems: borrow.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Borrow);
