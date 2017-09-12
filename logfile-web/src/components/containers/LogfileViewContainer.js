import {
  get,
  isNil,
} from 'lodash';
import { connect } from 'react-redux';
import {
  compose,
  mapProps,
  withHandlers,
} from 'recompose';

import LogfileView from '../LogfileView';
import { fetchLogfile } from '../../modules/logfile-module';

const LINE_PER_PAGE = 10;
const mapStateToProps = (state) => ({
  logfileContents: state.logfile.contents,
  logfileError: state.logfile.error,
  logfileIndex: get(state.logfile, 'contents.0.id', 0),
  logfileLoading: state.logfile.loading,
  logfileLine: state.logfile.line,
  logfileFilename: state.logfile.filename,
  searchFilename: get(state.form, 'search.values.filename', null),
});

const mapDispatchToProps = (dispatch) => ({
  fetchLogfile: (filename, index) =>
    dispatch(fetchLogfile(filename, index, LINE_PER_PAGE)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapProps((props) => ({
    ...props,
    error: props.logfileError,
    isLoading: props.logfileLoading,
  })),
  withHandlers({
    onSearchClick: ({ fetchLogfile, searchFilename }) => () => {
      if(!isNil(searchFilename)) {
        fetchLogfile(searchFilename, 0);
      }
    },
    onBackToBeginning: ({ logfileFilename, fetchLogfile }) => () => {
      fetchLogfile(logfileFilename, 0);
    },
    onBack: ({ logfileFilename, logfileIndex, logfileLine, fetchLogfile }) => () => {
      if(logfileIndex - LINE_PER_PAGE >= 0) {
        fetchLogfile(logfileFilename, logfileIndex - LINE_PER_PAGE);
      }
    },
    onNext: ({ logfileFilename, logfileIndex, logfileLine, fetchLogfile }) => () => {
      if(logfileIndex + LINE_PER_PAGE < logfileLine) {
        fetchLogfile(logfileFilename, logfileIndex + LINE_PER_PAGE);
      }
    },
    onNextToEnd: ({ logfileFilename, fetchLogfile, logfileLine }) => () => {
      fetchLogfile(logfileFilename, logfileLine - 10);
    },
  }),
)(LogfileView);