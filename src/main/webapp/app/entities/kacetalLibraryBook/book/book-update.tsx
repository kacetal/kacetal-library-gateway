import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {byteSize, openFile, setFileData, translate, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getAuthors} from 'app/entities/kacetalLibraryBook/author/author.reducer';
import {getEntities as getPublishers} from 'app/entities/kacetalLibraryBook/publisher/publisher.reducer';
import {createEntity, getEntity, reset, setBlob, updateEntity} from './book.reducer';
import {convertDateTimeFromServer, convertDateTimeToServer} from 'app/shared/util/date-utils';
import {mapIdList} from 'app/shared/util/entity-utils';

export interface IBookUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const BookUpdate = (props: IBookUpdateProps) => {
  const [idsauthors, setIdsauthors] = useState([]);
  const [publisherId, setPublisherId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {bookEntity, authors, publishers, loading, updating} = props;

  const {cover, coverContentType} = bookEntity;

  const handleClose = () => {
    props.history.push('/book' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAuthors();
    props.getPublishers();
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
    values.publishDate = convertDateTimeToServer(values.publishDate);

    if (errors.length === 0) {
      const entity = {
        ...bookEntity,
        ...values,
        authors: mapIdList(values.authors)
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
          <h2 id="kacetalLibraryGatewayApp.kacetalLibraryBookBook.home.createOrEditLabel">
            <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.home.createOrEditLabel">Create or
              edit a Book</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bookEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="book-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="book-id" type="text" className="form-control" name="id" required readOnly/>
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="isbnLabel" for="book-isbn">
                  <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.isbn">Isbn</Translate>
                </Label>
                <AvField
                  id="book-isbn"
                  type="text"
                  name="isbn"
                  validate={{
                    required: {value: true, errorMessage: translate('entity.validation.required')},
                    maxLength: {value: 13, errorMessage: translate('entity.validation.maxlength', {max: 13})}
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="titleLabel" for="book-title">
                  <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.title">Title</Translate>
                </Label>
                <AvField
                  id="book-title"
                  type="text"
                  name="title"
                  validate={{
                    required: {value: true, errorMessage: translate('entity.validation.required')},
                    maxLength: {value: 100, errorMessage: translate('entity.validation.maxlength', {max: 100})}
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="publishDateLabel" for="book-publishDate">
                  <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.publishDate">Publish
                    Date</Translate>
                </Label>
                <AvInput
                  id="book-publishDate"
                  type="datetime-local"
                  className="form-control"
                  name="publishDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? null : convertDateTimeFromServer(props.bookEntity.publishDate)}
                  validate={{
                    required: {value: true, errorMessage: translate('entity.validation.required')}
                  }}
                />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="coverLabel" for="cover">
                    <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.cover">Cover</Translate>
                  </Label>
                  <br/>
                  {cover ? (
                    <div>
                      <a onClick={openFile(coverContentType, cover)}>
                        <img src={`data:${coverContentType};base64,${cover}`} style={{maxHeight: '100px'}}/>
                      </a>
                      <br/>
                      <Row>
                        <Col md="11">
                          <span>
                            {coverContentType}, {byteSize(cover)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('cover')}>
                            <FontAwesomeIcon icon="times-circle"/>
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_cover" type="file" onChange={onBlobChange(true, 'cover')} accept="image/*"/>
                  <AvInput type="hidden" name="cover" value={cover}/>
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label for="book-authors">
                  <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.authors">Authors</Translate>
                </Label>
                <AvInput
                  id="book-authors"
                  type="select"
                  multiple
                  className="form-control"
                  name="authors"
                  value={bookEntity.authors && bookEntity.authors.map(e => e.id)}
                >
                  <option value="" key="0"/>
                  {authors
                    ? authors.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="book-publisher">
                  <Translate
                    contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.publisher">Publisher</Translate>
                </Label>
                <AvInput id="book-publisher" type="select" className="form-control" name="publisher.id">
                  <option value="" key="0"/>
                  {publishers
                    ? publishers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/book" replace color="info">
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
  authors: storeState.author.entities,
  publishers: storeState.publisher.entities,
  bookEntity: storeState.book.entity,
  loading: storeState.book.loading,
  updating: storeState.book.updating,
  updateSuccess: storeState.book.updateSuccess
});

const mapDispatchToProps = {
  getAuthors,
  getPublishers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookUpdate);
