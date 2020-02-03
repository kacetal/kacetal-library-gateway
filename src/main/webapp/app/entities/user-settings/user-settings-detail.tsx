import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-settings.reducer';
import { IUserSettings } from 'app/shared/model/user-settings.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserSettingsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserSettingsDetail = (props: IUserSettingsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { userSettingsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="kacetalLibraryGatewayApp.userSettings.detail.title">UserSettings</Translate> [
          <b>{userSettingsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="avatar">
              <Translate contentKey="kacetalLibraryGatewayApp.userSettings.avatar">Avatar</Translate>
            </span>
          </dt>
          <dd>
            {userSettingsEntity.avatar ? (
              <div>
                <a onClick={openFile(userSettingsEntity.avatarContentType, userSettingsEntity.avatar)}>
                  <img
                    src={`data:${userSettingsEntity.avatarContentType};base64,${userSettingsEntity.avatar}`}
                    style={{ maxHeight: '30px' }}
                  />
                </a>
                <span>
                  {userSettingsEntity.avatarContentType}, {byteSize(userSettingsEntity.avatar)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="mobilePhone">
              <Translate contentKey="kacetalLibraryGatewayApp.userSettings.mobilePhone">Mobile Phone</Translate>
            </span>
          </dt>
          <dd>{userSettingsEntity.mobilePhone}</dd>
          <dt>
            <span id="borrowLimit">
              <Translate contentKey="kacetalLibraryGatewayApp.userSettings.borrowLimit">Borrow Limit</Translate>
            </span>
          </dt>
          <dd>{userSettingsEntity.borrowLimit}</dd>
          <dt>
            <Translate contentKey="kacetalLibraryGatewayApp.userSettings.user">User</Translate>
          </dt>
          <dd>{userSettingsEntity.user ? userSettingsEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="kacetalLibraryGatewayApp.userSettings.addresses">Addresses</Translate>
          </dt>
          <dd>
            {userSettingsEntity.addresses
              ? userSettingsEntity.addresses.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {i === userSettingsEntity.addresses.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/user-settings" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-settings/${userSettingsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ userSettings }: IRootState) => ({
  userSettingsEntity: userSettings.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsDetail);
