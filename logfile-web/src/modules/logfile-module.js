// Actions
export const LOGFILE_UPDATE = 'logfile/logfile/update';
export const LOGFILE_FETCH = 'logfile/logfile/fetch';

// Reducers
const defaultState = {
  contents: [],
  filename: undefined,
};

export const logfileReducer = (state={}, action) => {
  switch(action.type) {
    case LOGFILE_UPDATE:
      // console.log(Object.assign({}, state, { contents: action.data }));
      return Object.assign({}, state, { contents: action.data });
    default:
      return state;
  }
}

// Action Creators
export const fetchLogfile = (filename, index, offset) => ({
  type: LOGFILE_FETCH,
  data: {
    filename,
    index,
    offset
  },
});

export const updateLogfile = (filename, _) => ({
  type: LOGFILE_UPDATE,
  data: {
    filename,
    contents,
  }
});

// Epics
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
  action$.ofType(LOGFILE_FETCH)
    .map((value) => {
      // Ajax operation here
      return updateLogfile('', contents);
    });
