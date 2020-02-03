import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Table} from 'reactstrap';
import {getSortState, JhiItemCount, JhiPagination, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities} from './address.reducer';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';

export interface IAddressProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const Address = (props: IAddressProps) => {
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

  const {addressList, match, totalItems} = props;
  return (
    <div>
      <h2 id="address-heading">
        <Translate contentKey="kacetalLibraryGatewayApp.address.home.title">Addresses</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus"/>
          &nbsp;
          <Translate contentKey="kacetalLibraryGatewayApp.address.home.createLabel">Create new Address</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {addressList && addressList.length > 0 ? (
          <Table responsive>
            <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('addressLine1')}>
                <Translate contentKey="kacetalLibraryGatewayApp.address.addressLine1">Address Line 1</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('addressLine2')}>
                <Translate contentKey="kacetalLibraryGatewayApp.address.addressLine2">Address Line 2</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('zipCode')}>
                <Translate contentKey="kacetalLibraryGatewayApp.address.zipCode">Zip Code</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th className="hand" onClick={sort('city')}>
                <Translate contentKey="kacetalLibraryGatewayApp.address.city">City</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th className="hand" onClick={sort('country')}>
                <Translate contentKey="kacetalLibraryGatewayApp.address.country">Country</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {addressList.map((address, i) => (
              <tr key={`entity-${i}`}>
                <td>
                  <Button tag={Link} to={`${match.url}/${address.id}`} color="link" size="sm">
                    {address.id}
                  </Button>
                </td>
                <td>{address.addressLine1}</td>
                <td>{address.addressLine2}</td>
                <td>{address.zipCode}</td>
                <td>{address.city}</td>
                <td>{address.country}</td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${address.id}`} color="info" size="sm">
                      <FontAwesomeIcon icon="eye"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`${match.url}/${address.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                      to={`${match.url}/${address.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
            <Translate contentKey="kacetalLibraryGatewayApp.address.home.notFound">No Addresses found</Translate>
          </div>
        )}
      </div>
      <div className={addressList && addressList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({address}: IRootState) => ({
  addressList: address.entities,
  totalItems: address.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Address);
