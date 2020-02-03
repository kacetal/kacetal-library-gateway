import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Translate, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';

import {createEntity, getEntity, reset, updateEntity} from './notification.reducer';
import {convertDateTimeFromServer, convertDateTimeToServer} from 'app/shared/util/date-utils';

export interface INotificationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const NotificationUpdate = (props: INotificationUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {notificationEntity, loading, updating} = props;

  const handleClose = () => {
    props.history.push('/notification' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.sentDate = convertDateTimeToServer(values.sentDate);

    if (errors.length === 0) {
      const entity = {
        ...notificationEntity,
        ...values
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
          <h2 id="kacetalLibraryGatewayApp.kacetalLibraryNotificationNotification.home.createOrEditLabel">
            <Translate
              contentKey="kacetalLibraryGatewayApp.kacetalLibraryNotificationNotification.home.createOrEditLabel">
              Create or edit a Notification
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : notificationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="notification-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="notification-id" type="text" className="form-control" name="id" required readOnly/>
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="sentDateLabel" for="notification-sentDate">
                  <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryNotificationNotification.sentDate">Sent
                    Date</Translate>
                </Label>
                <AvInput
                  id="notification-sentDate"
                  type="datetime-local"
                  className="form-control"
                  name="sentDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? null : convertDateTimeFromServer(props.notificationEntity.sentDate)}
                  validate={{
                    required: {value: true, errorMessage: translate('entity.validation.required')}
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="formatLabel" for="notification-format">
                  <Translate
                    contentKey="kacetalLibraryGatewayApp.kacetalLibraryNotificationNotification.format">Format</Translate>
                </Label>
                <AvInput
                  id="notification-format"
                  type="select"
                  className="form-control"
                  name="format"
                  value={(!isNew && notificationEntity.format) || 'EMAIL'}
                >
                  <option value="EMAIL">{translate('kacetalLibraryGatewayApp.NotificationType.EMAIL')}</option>
                  <option value="SMS">{translate('kacetalLibraryGatewayApp.NotificationType.SMS')}</option>
                  <option value="SITE">{translate('kacetalLibraryGatewayApp.NotificationType.SITE')}</option>
                  <option value="ALL">{translate('kacetalLibraryGatewayApp.NotificationType.ALL')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="detailsLabel" for="notification-details">
                  <Translate
                    contentKey="kacetalLibraryGatewayApp.kacetalLibraryNotificationNotification.details">Details</Translate>
                </Label>
                <AvField id="notification-details" type="text" name="details"/>
              </AvGroup>
              <AvGroup>
                <Label id="userIdLabel" for="notification-userId">
                  <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryNotificationNotification.userId">User
                    Id</Translate>
                </Label>
                <AvField
                  id="notification-userId"
                  type="string"
                  className="form-control"
                  name="userId"
                  validate={{
                    required: {value: true, errorMessage: translate('entity.validation.required')},
                    number: {value: true, errorMessage: translate('entity.validation.number')}
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="bookIdLabel" for="notification-bookId">
                  <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryNotificationNotification.bookId">Book
                    Id</Translate>
                </Label>
                <AvField
                  id="notification-bookId"
                  type="string"
                  className="form-control"
                  name="bookId"
                  validate={{
                    required: {value: true, errorMessage: translate('entity.validation.required')},
                    number: {value: true, errorMessage: translate('entity.validation.number')}
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/notification" replace color="info">
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
  notificationEntity: storeState.notification.entity,
  loading: storeState.notification.loading,
  updating: storeState.notification.updating,
  updateSuccess: storeState.notification.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NotificationUpdate);
