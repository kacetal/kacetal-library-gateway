import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Translate, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getUserSettings} from 'app/entities/user-settings/user-settings.reducer';
import {createEntity, getEntity, reset, updateEntity} from './address.reducer';

export interface IAddressUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const AddressUpdate = (props: IAddressUpdateProps) => {
  const [userSettingsId, setUserSettingsId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {addressEntity, userSettings, loading, updating} = props;

  const handleClose = () => {
    props.history.push('/address' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUserSettings();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...addressEntity,
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
          <h2 id="kacetalLibraryGatewayApp.address.home.createOrEditLabel">
            <Translate contentKey="kacetalLibraryGatewayApp.address.home.createOrEditLabel">Create or edit a
              Address</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : addressEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="address-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="address-id" type="text" className="form-control" name="id" required readOnly/>
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="addressLine1Label" for="address-addressLine1">
                  <Translate contentKey="kacetalLibraryGatewayApp.address.addressLine1">Address Line 1</Translate>
                </Label>
                <AvField
                  id="address-addressLine1"
                  type="text"
                  name="addressLine1"
                  validate={{
                    maxLength: {value: 200, errorMessage: translate('entity.validation.maxlength', {max: 200})}
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLine2Label" for="address-addressLine2">
                  <Translate contentKey="kacetalLibraryGatewayApp.address.addressLine2">Address Line 2</Translate>
                </Label>
                <AvField
                  id="address-addressLine2"
                  type="text"
                  name="addressLine2"
                  validate={{
                    maxLength: {value: 200, errorMessage: translate('entity.validation.maxlength', {max: 200})}
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="zipCodeLabel" for="address-zipCode">
                  <Translate contentKey="kacetalLibraryGatewayApp.address.zipCode">Zip Code</Translate>
                </Label>
                <AvField
                  id="address-zipCode"
                  type="text"
                  name="zipCode"
                  validate={{
                    maxLength: {value: 12, errorMessage: translate('entity.validation.maxlength', {max: 12})}
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="address-city">
                  <Translate contentKey="kacetalLibraryGatewayApp.address.city">City</Translate>
                </Label>
                <AvField id="address-city" type="text" name="city"/>
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="address-country">
                  <Translate contentKey="kacetalLibraryGatewayApp.address.country">Country</Translate>
                </Label>
                <AvField id="address-country" type="text" name="country"/>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/address" replace color="info">
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
  userSettings: storeState.userSettings.entities,
  addressEntity: storeState.address.entity,
  loading: storeState.address.loading,
  updating: storeState.address.updating,
  updateSuccess: storeState.address.updateSuccess
});

const mapDispatchToProps = {
  getUserSettings,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddressUpdate);
