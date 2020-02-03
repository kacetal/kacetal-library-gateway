import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Table} from 'reactstrap';
import {getSortState, JhiItemCount, JhiPagination, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities} from './stock.reducer';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';

export interface IStockProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const Stock = (props: IStockProps) => {
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

  const {stockList, match, totalItems} = props;
  return (
    <div>
      <h2 id="stock-heading">
        <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryStockStock.home.title">Stocks</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus"/>
          &nbsp;
          <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryStockStock.home.createLabel">Create new
            Stock</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {stockList && stockList.length > 0 ? (
          <Table responsive>
            <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('name')}>
                <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryStockStock.name">Name</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('quantity')}>
                <Translate
                  contentKey="kacetalLibraryGatewayApp.kacetalLibraryStockStock.quantity">Quantity</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('bookStockStatus')}>
                <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryStockStock.bookStockStatus">Book Stock
                  Status</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {stockList.map((stock, i) => (
              <tr key={`entity-${i}`}>
                <td>
                  <Button tag={Link} to={`${match.url}/${stock.id}`} color="link" size="sm">
                    {stock.id}
                  </Button>
                </td>
                <td>{stock.name}</td>
                <td>{stock.quantity}</td>
                <td>
                  <Translate contentKey={`kacetalLibraryGatewayApp.BookStockStatus.${stock.bookStockStatus}`}/>
                </td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${stock.id}`} color="info" size="sm">
                      <FontAwesomeIcon icon="eye"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`${match.url}/${stock.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                      to={`${match.url}/${stock.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
            <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryStockStock.home.notFound">No Stocks
              found</Translate>
          </div>
        )}
      </div>
      <div className={stockList && stockList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({stock}: IRootState) => ({
  stockList: stock.entities,
  totalItems: stock.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
