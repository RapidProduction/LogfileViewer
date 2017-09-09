// import { ajax } from 'rxjs/operators';

// Actions
export const LOGFILE_UPDATE = 'logfile/logfile/update';
export const LOGFILE_FETCH = 'logfile/logfile/fetch';

// Reducer
const defaultState = {
  contents: [],
};

export const logfileReducer = (state={}, action) => {
  switch(action.type) {
    case LOGFILE_UPDATE:
      console.log(Object.assign({}, state, { contents: action.data }));
      return Object.assign({}, state, { contents: action.data });
    default:
      return state;
  }
}

// Action Creator
export const fetchLogfile = (filename, index, offset) => ({
  type: LOGFILE_FETCH,
  data: {
    filename,
    index,
    offset
  },
});

// Epic
const contents = [
  {
    id: 2,
    value: 'ABC',
  },
  {
    id: 3,
    value: 'DEF',
  },
  {
    id: 4,
    value: 'GHJ',
  },
  {
    id: 4,
    value: 'JKL',
  },
];

export const logfileEpic = action$ =>
  action$.ofType(action => action.type === LOGFILE_FETCH)
    .mapTo({
      type: LOGFILE_UPDATE,
      data: contents,
    });
