// Actions
export const LOGFILE_UPDATE = "logfile/logfile/update";
export const LOGFILE_FETCH = "logfile/logfile/fetch";

// Reducer
const defaultState = {
  contents: [],
};

export const logfileReducer = (state={}, action) => {
  switch(action.type) {
    case LOGFILE_UPDATE:
      return Object.assign({}, state, action.data);
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
    value: "ABC",
  },
  {
    id: 3,
    value: "ABC",
  },
  {
    id: 4,
    value: "ABC",
  },
  {
    id: 4,
    value: "ABC",
  },
];

export const logfileEpic = action$ =>
  action$.ofType(action => action.type === LOGFILE_FETCH)
    .mapTo({
      type: LOGFILE_UPDATE,
      data: contents,
    });
