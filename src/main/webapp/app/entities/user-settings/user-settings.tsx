import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Table} from 'reactstrap';
import {byteSize, getSortState, JhiItemCount, JhiPagination, openFile, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities} from './user-settings.reducer';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';

export interface IUserSettingsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const UserSettings = (props: IUserSettingsProps) => {
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

  const {userSettingsList, match, totalItems} = props;
  return (
    <div>
      <h2 id="user-settings-heading">
        <Translate contentKey="kacetalLibraryGatewayApp.userSettings.home.title">User Settings</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus"/>
          &nbsp;
          <Translate contentKey="kacetalLibraryGatewayApp.userSettings.home.createLabel">Create new User
            Settings</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {userSettingsList && userSettingsList.length > 0 ? (
          <Table responsive>
            <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('avatar')}>
                <Translate contentKey="kacetalLibraryGatewayApp.userSettings.avatar">Avatar</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th className="hand" onClick={sort('mobilePhone')}>
                <Translate contentKey="kacetalLibraryGatewayApp.userSettings.mobilePhone">Mobile Phone</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('borrowLimit')}>
                <Translate contentKey="kacetalLibraryGatewayApp.userSettings.borrowLimit">Borrow Limit</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th>
                <Translate contentKey="kacetalLibraryGatewayApp.userSettings.user">User</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {userSettingsList.map((userSettings, i) => (
              <tr key={`entity-${i}`}>
                <td>
                  <Button tag={Link} to={`${match.url}/${userSettings.id}`} color="link" size="sm">
                    {userSettings.id}
                  </Button>
                </td>
                <td>
                  {userSettings.avatar ? (
                    <div>
                      <a onClick={openFile(userSettings.avatarContentType, userSettings.avatar)}>
                        <img src={`data:${userSettings.avatarContentType};base64,${userSettings.avatar}`}
                             style={{maxHeight: '30px'}}/>
                        &nbsp;
                      </a>
                      <span>
                          {userSettings.avatarContentType}, {byteSize(userSettings.avatar)}
                        </span>
                    </div>
                  ) : null}
                </td>
                <td>{userSettings.mobilePhone}</td>
                <td>{userSettings.borrowLimit}</td>
                <td>{userSettings.user ? userSettings.user.id : ''}</td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${userSettings.id}`} color="info" size="sm">
                      <FontAwesomeIcon icon="eye"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`${match.url}/${userSettings.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                      to={`${match.url}/${userSettings.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
            <Translate contentKey="kacetalLibraryGatewayApp.userSettings.home.notFound">No User Settings
              found</Translate>
          </div>
        )}
      </div>
      <div className={userSettingsList && userSettingsList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({userSettings}: IRootState) => ({
  userSettingsList: userSettings.entities,
  totalItems: userSettings.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
