import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Table} from 'reactstrap';
import {getSortState, JhiItemCount, JhiPagination, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities} from './publisher.reducer';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';

export interface IPublisherProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const Publisher = (props: IPublisherProps) => {
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

  const {publisherList, match, totalItems} = props;
  return (
    <div>
      <h2 id="publisher-heading">
        <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookPublisher.home.title">Publishers</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus"/>
          &nbsp;
          <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookPublisher.home.createLabel">Create new
            Publisher</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {publisherList && publisherList.length > 0 ? (
          <Table responsive>
            <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('name')}>
                <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookPublisher.name">Name</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {publisherList.map((publisher, i) => (
              <tr key={`entity-${i}`}>
                <td>
                  <Button tag={Link} to={`${match.url}/${publisher.id}`} color="link" size="sm">
                    {publisher.id}
                  </Button>
                </td>
                <td>{publisher.name}</td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${publisher.id}`} color="info" size="sm">
                      <FontAwesomeIcon icon="eye"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`${match.url}/${publisher.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                      to={`${match.url}/${publisher.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
            <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookPublisher.home.notFound">No Publishers
              found</Translate>
          </div>
        )}
      </div>
      <div className={publisherList && publisherList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({publisher}: IRootState) => ({
  publisherList: publisher.entities,
  totalItems: publisher.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Publisher);
