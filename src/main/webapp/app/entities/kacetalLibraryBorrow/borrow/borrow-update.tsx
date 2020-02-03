import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Translate, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';

import {createEntity, getEntity, reset, updateEntity} from './borrow.reducer';

export interface IBorrowUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const BorrowUpdate = (props: IBorrowUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {borrowEntity, loading, updating} = props;

  const handleClose = () => {
    props.history.push('/borrow' + props.location.search);
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
    if (errors.length === 0) {
      const entity = {
        ...borrowEntity,
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
          <h2 id="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.home.createOrEditLabel">
            <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.home.createOrEditLabel">
              Create or edit a Borrow
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : borrowEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="borrow-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="borrow-id" type="text" className="form-control" name="id" required readOnly/>
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="bookIdLabel" for="borrow-bookId">
                  <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.bookId">Book Id</Translate>
                </Label>
                <AvField
                  id="borrow-bookId"
                  type="string"
                  className="form-control"
                  name="bookId"
                  validate={{
                    required: {value: true, errorMessage: translate('entity.validation.required')},
                    number: {value: true, errorMessage: translate('entity.validation.number')}
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="userIdLabel" for="borrow-userId">
                  <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.userId">User Id</Translate>
                </Label>
                <AvField
                  id="borrow-userId"
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
                <Label id="borrowDurationLabel" for="borrow-borrowDuration">
                  <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.borrowDuration">Borrow
                    Duration</Translate>
                </Label>
                <AvField
                  id="borrow-borrowDuration"
                  type="text"
                  name="borrowDuration"
                  validate={{
                    required: {value: true, errorMessage: translate('entity.validation.required')}
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="borrowStatusLabel" for="borrow-borrowStatus">
                  <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.borrowStatus">Borrow
                    Status</Translate>
                </Label>
                <AvInput
                  id="borrow-borrowStatus"
                  type="select"
                  className="form-control"
                  name="borrowStatus"
                  value={(!isNew && borrowEntity.borrowStatus) || 'EXPIRED'}
                >
                  <option value="EXPIRED">{translate('kacetalLibraryGatewayApp.BorrowStatus.EXPIRED')}</option>
                  <option value="FINISHED">{translate('kacetalLibraryGatewayApp.BorrowStatus.FINISHED')}</option>
                  <option value="PROLONGED">{translate('kacetalLibraryGatewayApp.BorrowStatus.PROLONGED')}</option>
                  <option value="BORROWED">{translate('kacetalLibraryGatewayApp.BorrowStatus.BORROWED')}</option>
                  <option value="STARTED">{translate('kacetalLibraryGatewayApp.BorrowStatus.STARTED')}</option>
                  <option value="CANCELLED">{translate('kacetalLibraryGatewayApp.BorrowStatus.CANCELLED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="notificationTypeLabel" for="borrow-notificationType">
                  <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.notificationType">Notification
                    Type</Translate>
                </Label>
                <AvField
                  id="borrow-notificationType"
                  type="text"
                  name="notificationType"
                  validate={{
                    maxLength: {value: 50, errorMessage: translate('entity.validation.maxlength', {max: 50})}
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="prolongedLabel" for="borrow-prolonged">
                  <Translate
                    contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.prolonged">Prolonged</Translate>
                </Label>
                <AvField
                  id="borrow-prolonged"
                  type="string"
                  className="form-control"
                  name="prolonged"
                  validate={{
                    min: {value: 0, errorMessage: translate('entity.validation.min', {min: 0})},
                    max: {value: 3, errorMessage: translate('entity.validation.max', {max: 3})},
                    number: {value: true, errorMessage: translate('entity.validation.number')}
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/borrow" replace color="info">
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
  borrowEntity: storeState.borrow.entity,
  loading: storeState.borrow.loading,
  updating: storeState.borrow.updating,
  updateSuccess: storeState.borrow.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BorrowUpdate);
