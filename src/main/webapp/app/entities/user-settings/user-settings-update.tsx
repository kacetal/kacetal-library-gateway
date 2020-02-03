import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {byteSize, openFile, setFileData, translate, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getUsers} from 'app/modules/administration/user-management/user-management.reducer';
import {getEntities as getAddresses} from 'app/entities/address/address.reducer';
import {createEntity, getEntity, reset, setBlob, updateEntity} from './user-settings.reducer';
import {mapIdList} from 'app/shared/util/entity-utils';

export interface IUserSettingsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const UserSettingsUpdate = (props: IUserSettingsUpdateProps) => {
  const [idsaddresses, setIdsaddresses] = useState([]);
  const [userId, setUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {userSettingsEntity, users, addresses, loading, updating} = props;

  const {avatar, avatarContentType} = userSettingsEntity;

  const handleClose = () => {
    props.history.push('/user-settings' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getAddresses();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...userSettingsEntity,
        ...values,
        addresses: mapIdList(values.addresses)
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="kacetalLibraryGatewayApp.userSettings.home.createOrEditLabel">
            <Translate contentKey="kacetalLibraryGatewayApp.userSettings.home.createOrEditLabel">Create or edit a
              UserSettings</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : userSettingsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="user-settings-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="user-settings-id" type="text" className="form-control" name="id" required readOnly/>
                </AvGroup>
              ) : null}
              <AvGroup>
                <AvGroup>
                  <Label id="avatarLabel" for="avatar">
                    <Translate contentKey="kacetalLibraryGatewayApp.userSettings.avatar">Avatar</Translate>
                  </Label>
                  <br/>
                  {avatar ? (
                    <div>
                      <a onClick={openFile(avatarContentType, avatar)}>
                        <img src={`data:${avatarContentType};base64,${avatar}`} style={{maxHeight: '100px'}}/>
                      </a>
                      <br/>
                      <Row>
                        <Col md="11">
                          <span>
                            {avatarContentType}, {byteSize(avatar)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('avatar')}>
                            <FontAwesomeIcon icon="times-circle"/>
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_avatar" type="file" onChange={onBlobChange(true, 'avatar')} accept="image/*"/>
                  <AvInput type="hidden" name="avatar" value={avatar}/>
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="mobilePhoneLabel" for="user-settings-mobilePhone">
                  <Translate contentKey="kacetalLibraryGatewayApp.userSettings.mobilePhone">Mobile Phone</Translate>
                </Label>
                <AvField
                  id="user-settings-mobilePhone"
                  type="text"
                  name="mobilePhone"
                  validate={{
                    maxLength: {value: 15, errorMessage: translate('entity.validation.maxlength', {max: 15})}
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="borrowLimitLabel" for="user-settings-borrowLimit">
                  <Translate contentKey="kacetalLibraryGatewayApp.userSettings.borrowLimit">Borrow Limit</Translate>
                </Label>
                <AvField id="user-settings-borrowLimit" type="string" className="form-control" name="borrowLimit"/>
              </AvGroup>
              <AvGroup>
                <Label for="user-settings-user">
                  <Translate contentKey="kacetalLibraryGatewayApp.userSettings.user">User</Translate>
                </Label>
                <AvInput id="user-settings-user" type="select" className="form-control" name="user.id">
                  <option value="" key="0"/>
                  {users
                    ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="user-settings-addresses">
                  <Translate contentKey="kacetalLibraryGatewayApp.userSettings.addresses">Addresses</Translate>
                </Label>
                <AvInput
                  id="user-settings-addresses"
                  type="select"
                  multiple
                  className="form-control"
                  name="addresses"
                  value={userSettingsEntity.addresses && userSettingsEntity.addresses.map(e => e.id)}
                >
                  <option value="" key="0"/>
                  {addresses
                    ? addresses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/user-settings" replace color="info">
                <FontAwesomeIcon icon="arrow-left"/>
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save"/>
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  addresses: storeState.address.entities,
  userSettingsEntity: storeState.userSettings.entity,
  loading: storeState.userSettings.loading,
  updating: storeState.userSettings.updating,
  updateSuccess: storeState.userSettings.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getAddresses,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsUpdate);
