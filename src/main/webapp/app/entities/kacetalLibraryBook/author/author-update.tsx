import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Translate, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getBooks} from 'app/entities/kacetalLibraryBook/book/book.reducer';
import {createEntity, getEntity, reset, updateEntity} from './author.reducer';

export interface IAuthorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const AuthorUpdate = (props: IAuthorUpdateProps) => {
  const [booksId, setBooksId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {authorEntity, books, loading, updating} = props;

  const handleClose = () => {
    props.history.push('/author' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBooks();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...authorEntity,
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
          <h2 id="kacetalLibraryGatewayApp.kacetalLibraryBookAuthor.home.createOrEditLabel">
            <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookAuthor.home.createOrEditLabel">
              Create or edit a Author
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : authorEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="author-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="author-id" type="text" className="form-control" name="id" required readOnly/>
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="author-firstName">
                  <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookAuthor.firstName">First
                    Name</Translate>
                </Label>
                <AvField
                  id="author-firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: {value: true, errorMessage: translate('entity.validation.required')},
                    maxLength: {value: 50, errorMessage: translate('entity.validation.maxlength', {max: 50})}
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="author-lastName">
                  <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookAuthor.lastName">Last
                    Name</Translate>
                </Label>
                <AvField
                  id="author-lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: {value: true, errorMessage: translate('entity.validation.required')},
                    maxLength: {value: 50, errorMessage: translate('entity.validation.maxlength', {max: 50})}
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="pseudonymLabel" for="author-pseudonym">
                  <Translate
                    contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookAuthor.pseudonym">Pseudonym</Translate>
                </Label>
                <AvField
                  id="author-pseudonym"
                  type="text"
                  name="pseudonym"
                  validate={{
                    maxLength: {value: 50, errorMessage: translate('entity.validation.maxlength', {max: 50})}
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/author" replace color="info">
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
  books: storeState.book.entities,
  authorEntity: storeState.author.entity,
  loading: storeState.author.loading,
  updating: storeState.author.updating,
  updateSuccess: storeState.author.updateSuccess
});

const mapDispatchToProps = {
  getBooks,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AuthorUpdate);
