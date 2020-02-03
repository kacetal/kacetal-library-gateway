import axios from 'axios';
import {ICrudDeleteAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction} from 'react-jhipster';

import {cleanEntity} from 'app/shared/util/entity-utils';
import {FAILURE, REQUEST, SUCCESS} from 'app/shared/reducers/action-type.util';
import {defaultValue, IBorrow} from 'app/shared/model/kacetalLibraryBorrow/borrow.model';

export const ACTION_TYPES = {
  FETCH_BORROW_LIST: 'borrow/FETCH_BORROW_LIST',
  FETCH_BORROW: 'borrow/FETCH_BORROW',
  CREATE_BORROW: 'borrow/CREATE_BORROW',
  UPDATE_BORROW: 'borrow/UPDATE_BORROW',
  DELETE_BORROW: 'borrow/DELETE_BORROW',
  RESET: 'borrow/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBorrow>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type BorrowState = Readonly<typeof initialState>;

// Reducer

export default (state: BorrowState = initialState, action): BorrowState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BORROW_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BORROW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BORROW):
    case REQUEST(ACTION_TYPES.UPDATE_BORROW):
    case REQUEST(ACTION_TYPES.DELETE_BORROW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BORROW_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BORROW):
    case FAILURE(ACTION_TYPES.CREATE_BORROW):
    case FAILURE(ACTION_TYPES.UPDATE_BORROW):
    case FAILURE(ACTION_TYPES.DELETE_BORROW):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BORROW_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_BORROW):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BORROW):
    case SUCCESS(ACTION_TYPES.UPDATE_BORROW):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BORROW):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'services/kacetallibraryborrow/api/borrows';

// Actions

export const getEntities: ICrudGetAllAction<IBorrow> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BORROW_LIST,
    payload: axios.get<IBorrow>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IBorrow> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BORROW,
    payload: axios.get<IBorrow>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBorrow> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BORROW,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBorrow> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BORROW,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBorrow> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BORROW,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
