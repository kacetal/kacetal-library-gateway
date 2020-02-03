import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Table} from 'reactstrap';
import {byteSize, getSortState, JhiItemCount, JhiPagination, openFile, TextFormat, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities} from './book.reducer';
import {APP_DATE_FORMAT} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';

export interface IBookProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const Book = (props: IBookProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  useEffect(() => {
    getAllEntities();
  }, []);

  const sortEntities = () => {
    getAllEntities();
    props.history.push(
      `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    );
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  const {bookList, match, totalItems} = props;
  return (
    <div>
      <h2 id="book-heading">
        <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.home.title">Books</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus"/>
          &nbsp;
          <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.home.createLabel">Create new
            Book</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {bookList && bookList.length > 0 ? (
          <Table responsive>
            <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('isbn')}>
                <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.isbn">Isbn</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('title')}>
                <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.title">Title</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('publishDate')}>
                <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.publishDate">Publish
                  Date</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('cover')}>
                <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.cover">Cover</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th>
                <Translate
                  contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.publisher">Publisher</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {bookList.map((book, i) => (
              <tr key={`entity-${i}`}>
                <td>
                  <Button tag={Link} to={`${match.url}/${book.id}`} color="link" size="sm">
                    {book.id}
                  </Button>
                </td>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>
                  <TextFormat type="date" value={book.publishDate} format={APP_DATE_FORMAT}/>
                </td>
                <td>
                  {book.cover ? (
                    <div>
                      <a onClick={openFile(book.coverContentType, book.cover)}>
                        <img src={`data:${book.coverContentType};base64,${book.cover}`} style={{maxHeight: '30px'}}/>
                        &nbsp;
                      </a>
                      <span>
                          {book.coverContentType}, {byteSize(book.cover)}
                        </span>
                    </div>
                  ) : null}
                </td>
                <td>{book.publisher ? <Link to={`publisher/${book.publisher.id}`}>{book.publisher.id}</Link> : ''}</td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${book.id}`} color="info" size="sm">
                      <FontAwesomeIcon icon="eye"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`${match.url}/${book.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                      color="primary"
                      size="sm"
                    >
                      <FontAwesomeIcon icon="pencil-alt"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`${match.url}/${book.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                      color="danger"
                      size="sm"
                    >
                      <FontAwesomeIcon icon="trash"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        ) : (
          <div className="alert alert-warning">
            <Translate contentKey="kacetalLibraryGatewayApp.kacetalLibraryBookBook.home.notFound">No Books
              found</Translate>
          </div>
        )}
      </div>
      <div className={bookList && bookList.length > 0 ? '' : 'd-none'}>
        <Row className="justify-content-center">
          <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage}
                        i18nEnabled/>
        </Row>
        <Row className="justify-content-center">
          <JhiPagination
            activePage={paginationState.activePage}
            onSelect={handlePagination}
            maxButtons={5}
            itemsPerPage={paginationState.itemsPerPage}
            totalItems={props.totalItems}
          />
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = ({book}: IRootState) => ({
  bookList: book.entities,
  totalItems: book.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Book);
