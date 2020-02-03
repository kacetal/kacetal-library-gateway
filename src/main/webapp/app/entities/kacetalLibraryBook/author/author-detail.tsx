import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './author.reducer';

export interface IAuthorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const AuthorDetail = (props: IAuthorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const {authorEntity} = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookAuthor.detail.title">Author</Translate> [
          <b>{authorEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="firstName">
              <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookAuthor.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{authorEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookAuthor.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{authorEntity.lastName}</dd>
          <dt>
            <span id="pseudonym">
              <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookAuthor.pseudonym">Pseudonym</Translate>
            </span>
          </dt>
          <dd>{authorEntity.pseudonym}</dd>
        </dl>
        <Button tag={Link} to="/author" replace color="info">
          <FontAwesomeIcon icon="arrow-left"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/author/${authorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({author}: IRootState) => ({
  authorEntity: author.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetail);
