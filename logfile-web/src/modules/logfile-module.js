import { Observable } from 'rxjs';
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
  loading: false,
};

export const logfileReducer = (state=defaultState, action) => {
  switch(action.type) {
    case LOGFILE_FETCH:
      return Object.assign({}, state, { loading: true });
    case LOGFILE_UPDATE:
      return Object.assign({}, state, { ...action.data }, { loading: false });
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

export const updateLogfile = (filename, line, contents, error) => ({
  type: LOGFILE_UPDATE,
  data: {
    filename,
    line,
    contents,
    error,
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
      .map((file) => updateLogfile(file.id, file.line, file.content, null))
      .catch(error => Observable.of(error)
        .map((error) => updateLogfile(null, null, null, error)))
    );
