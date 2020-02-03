import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './stock.reducer';

export interface IStockDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const StockDetail = (props: IStockDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const {stockEntity} = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate
            contentKey="kacetalLibraryGatewayApp.kacetalLibraryStockStock.detail.title">Stock</Translate> [<b>{stockEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryStockStock.name">Name</Translate>
            </span>
          </dt>
          <dd>{stockEntity.name}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryStockStock.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{stockEntity.quantity}</dd>
          <dt>
            <span id="bookStockStatus">
              <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryStockStock.bookStockStatus">Book Stock Status</Translate>
            </span>
          </dt>
          <dd>{stockEntity.bookStockStatus}</dd>
        </dl>
        <Button tag={Link} to="/stock" replace color="info">
          <FontAwesomeIcon icon="arrow-left"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/stock/${stockEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({stock}: IRootState) => ({
  stockEntity: stock.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StockDetail);
