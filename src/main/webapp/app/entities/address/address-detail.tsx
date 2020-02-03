import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './address.reducer';

export interface IAddressDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const AddressDetail = (props: IAddressDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const {addressEntity} = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate
            contentKey="kacetalLibraryGatewayApp.address.detail.title">Address</Translate> [<b>{addressEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="addressLine1">
              <Translate contentKey="kacetalLibraryGatewayApp.address.addressLine1">Address Line 1</Translate>
            </span>
          </dt>
          <dd>{addressEntity.addressLine1}</dd>
          <dt>
            <span id="addressLine2">
              <Translate contentKey="kacetalLibraryGatewayApp.address.addressLine2">Address Line 2</Translate>
            </span>
          </dt>
          <dd>{addressEntity.addressLine2}</dd>
          <dt>
            <span id="zipCode">
              <Translate contentKey="kacetalLibraryGatewayApp.address.zipCode">Zip Code</Translate>
            </span>
          </dt>
          <dd>{addressEntity.zipCode}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="kacetalLibraryGatewayApp.address.city">City</Translate>
            </span>
          </dt>
          <dd>{addressEntity.city}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="kacetalLibraryGatewayApp.address.country">Country</Translate>
            </span>
          </dt>
          <dd>{addressEntity.country}</dd>
        </dl>
        <Button tag={Link} to="/address" replace color="info">
          <FontAwesomeIcon icon="arrow-left"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/address/${addressEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({address}: IRootState) => ({
  addressEntity: address.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetail);
