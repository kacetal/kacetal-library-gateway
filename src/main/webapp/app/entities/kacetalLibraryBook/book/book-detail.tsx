import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './book.reducer';
import { IBook } from 'app/shared/model/kacetalLibraryBook/book.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBookDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BookDetail = (props: IBookDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bookEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.detail.title">Book</Translate> [<b>{bookEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="isbn">
              <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.isbn">Isbn</Translate>
            </span>
          </dt>
          <dd>{bookEntity.isbn}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.title">Title</Translate>
            </span>
          </dt>
          <dd>{bookEntity.title}</dd>
          <dt>
            <span id="publishDate">
              <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.publishDate">Publish Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={bookEntity.publishDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="cover">
              <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.cover">Cover</Translate>
            </span>
          </dt>
          <dd>
            {bookEntity.cover ? (
              <div>
                <a onClick={openFile(bookEntity.coverContentType, bookEntity.cover)}>
                  <img src={`data:${bookEntity.coverContentType};base64,${bookEntity.cover}`} style={{ maxHeight: '30px' }} />
                </a>
                <span>
                  {bookEntity.coverContentType}, {byteSize(bookEntity.cover)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.authors">Authors</Translate>
          </dt>
          <dd>
            {bookEntity.authors
              ? bookEntity.authors.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {i === bookEntity.authors.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.publisher">Publisher</Translate>
          </dt>
          <dd>{bookEntity.publisher ? bookEntity.publisher.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/book" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/book/${bookEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ book }: IRootState) => ({
  bookEntity: book.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
