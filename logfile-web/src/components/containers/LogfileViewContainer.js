import { get } from 'lodash';
import { connect } from 'react-redux';
import {
  compose,
  withProps,
  withState,
  withHandlers,
} from 'recompose';

import LogfileView from '../LogfileView';
import { fetchLogfile, updateLogfile } from '../../modules/logfile-module';

const FILENAME = "test.small";
const LINE_PER_PAGE = 10;
const mapStateToProps = (state) => ({
  logfileContents: state.logfile.contents,
  logfileLine: state.logfile.line,
  logfileIndex: get(state.logfile, 'contents.0.id', 0),
});

const mapDispatchToProps = (dispatch) => ({
  fetchLogfile: (filename, index) =>
    dispatch(fetchLogfile(filename, index, LINE_PER_PAGE)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onSearchbarChange: ({ fetchLogfile }) => () => console.log("on search bar change"),
    onSearchClick: ({ fetchLogfile }) => () => fetchLogfile(FILENAME, 0),
    // This is redundant due to consistency reason
    onBackToBeginning: ({ fetchLogfile }) => () => fetchLogfile(FILENAME, 0),
    onBack: ({ logfileLine, logfileIndex, fetchLogfile }) => () => {
      if(logfileIndex - LINE_PER_PAGE >= 0)
        fetchLogfile(FILENAME, logfileIndex - LINE_PER_PAGE);
    },
    onNext: ({ logfileLine, logfileIndex, fetchLogfile }) => () => {
      if(logfileIndex + LINE_PER_PAGE < logfileLine)
        fetchLogfile(FILENAME, logfileIndex + LINE_PER_PAGE);
    },
    onNextToEnd: ({ fetchLogfile, logfileLine }) => () => fetchLogfile(FILENAME, logfileLine - 10),
  }),
)(LogfileView);