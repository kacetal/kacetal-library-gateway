import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Translate, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';

import {createEntity, getEntity, reset, updateEntity} from './publisher.reducer';

export interface IPublisherUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const PublisherUpdate = (props: IPublisherUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {publisherEntity, loading, updating} = props;

  const handleClose = () => {
    props.history.push('/publisher' + props.location.search);
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
        ...publisherEntity,
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
          <h2 id="kacetalLibraryGatewayApp.kacetalLibraryBookPublisher.home.createOrEditLabel">
            <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookPublisher.home.createOrEditLabel">
              Create or edit a Publisher
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : publisherEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="publisher-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="publisher-id" type="text" className="form-control" name="id" required readOnly/>
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="publisher-name">
                  <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookPublisher.name">Name</Translate>
                </Label>
                <AvField
                  id="publisher-name"
                  type="text"
                  name="name"
                  validate={{
                    required: {value: true, errorMessage: translate('entity.validation.required')},
                    maxLength: {value: 50, errorMessage: translate('entity.validation.maxlength', {max: 50})}
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/publisher" replace color="info">
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
  publisherEntity: storeState.publisher.entity,
  loading: storeState.publisher.loading,
  updating: storeState.publisher.updating,
  updateSuccess: storeState.publisher.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PublisherUpdate);
