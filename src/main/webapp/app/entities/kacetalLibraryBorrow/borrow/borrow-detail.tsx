import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './borrow.reducer';

export interface IBorrowDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const BorrowDetail = (props: IBorrowDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const {borrowEntity} = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.detail.title">Borrow</Translate> [
          <b>{borrowEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="bookId">
              <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.bookId">Book Id</Translate>
            </span>
          </dt>
          <dd>{borrowEntity.bookId}</dd>
          <dt>
            <span id="userId">
              <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.userId">User Id</Translate>
            </span>
          </dt>
          <dd>{borrowEntity.userId}</dd>
          <dt>
            <span id="borrowDuration">
              <Translate
                contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.borrowDuration">Borrow Duration</Translate>
            </span>
          </dt>
          <dd>{borrowEntity.borrowDuration}</dd>
          <dt>
            <span id="borrowStatus">
              <Translate
                contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.borrowStatus">Borrow Status</Translate>
            </span>
          </dt>
          <dd>{borrowEntity.borrowStatus}</dd>
          <dt>
            <span id="notificationType">
              <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.notificationType">Notification Type</Translate>
            </span>
          </dt>
          <dd>{borrowEntity.notificationType}</dd>
          <dt>
            <span id="prolonged">
              <Translate
                contentKey="kacetalLibraryGatewayApp.kacetalLibraryBorrowBorrow.prolonged">Prolonged</Translate>
            </span>
          </dt>
          <dd>{borrowEntity.prolonged}</dd>
        </dl>
        <Button tag={Link} to="/borrow" replace color="info">
          <FontAwesomeIcon icon="arrow-left"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/borrow/${borrowEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({borrow}: IRootState) => ({
  borrowEntity: borrow.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BorrowDetail);
