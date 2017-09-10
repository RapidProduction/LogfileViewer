import { connect } from 'react-redux';
import {
  compose,
  withProps,
  withState,
  withHandlers,
} from 'recompose';

import LogfileView from '../LogfileView.jsx';
import { fetchLogfile, updateLogfile } from '../../modules/logfile-module';

const filename = "test.small";
const mapStateToProps = (state) => ({
  // TODO: Use lodash selector
  logfileContents: state.logfile.contents ? state.logfile.contents.contents : null,
});

const mapDispatchToProps = (dispatch) => ({
  onSearchClick: () => {
    // Try using local state to manage index
    console.log("onSearchClick");
    dispatch(fetchLogfile(filename, 0, 10));
  },
  onBackToBeginning: () => {
    // Try using local state to manage index
    console.log("onBackToBeginning");
    dispatch(fetchLogfile(filename, 0, 10));
  },
  onBack: () => {
    // Try using local state to manage index
    console.log("onBack");
    dispatch(fetchLogfile(filename, 0, 10));
  },
  onNext: () => {
    console.log("onNext");
    dispatch(fetchLogfile(filename, 9, 10));
  },
  onNextToEnd: () => {
    console.log("onNextToEnd");
    dispatch(fetchLogfile(filename, 19, 10));
  }
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers( props => ({
    onSearchbarChange: () => {
      console.log("on search bar change");
    },
  })),
)(LogfileView);