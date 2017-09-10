import { ajax } from 'rxjs/observable/dom/ajax';

import { deserializeFile } from '../libraries/normalizers/file-normalizer';
import { formGetFileRequest } from '../libraries/requests/file-request';

// Actions
export const LOGFILE_UPDATE = 'logfile/logfile/update';
export const LOGFILE_FETCH = 'logfile/logfile/fetch';

// Reducers
const defaultState = {
  error: null,
  contents: [],
  filename: undefined,
  line: 0,
};

export const logfileReducer = (state=defaultState, action) => {
  switch(action.type) {
    case LOGFILE_UPDATE:
      return Object.assign({}, state, { ...action.data });
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

export const updateLogfile = (filename, line, contents) => ({
  type: LOGFILE_UPDATE,
  data: {
    filename,
    line,
    contents,
  }
});

// Epics
export const logfileEpic = action$ =>
  action$.ofType(LOGFILE_FETCH)
  .mergeMap(action =>
    ajax.getJSON(
      formGetFileRequest(
        action.data.filename,
        action.data.index,
        action.data.offset))
      .switchMap(deserializeFile)
      .map((file) => updateLogfile(file.id, file.line, file.content))
  );
