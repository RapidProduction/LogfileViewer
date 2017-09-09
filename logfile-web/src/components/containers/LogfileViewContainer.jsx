import { connect } from 'react-redux';
import {
  compose,
  withProps,
  withState,
  withHandlers,
} from 'recompose';

import LogfileView from '../LogfileView.jsx';
import { fetchLogfile } from '../../modules/logfile-module';

const filename = "test.small";
const mapStateToProps = (state) => ({
  logfileContents: [
    {
      id: 1,
      value: "ABC",
    },
  ],
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
  withProps({
    logfileContents: [
      {
        id: 1,
        value: "ABC",
      }
    ],
  }),
  withHandlers( props => ({
    onSearchbarChange: () => {
      console.log("on search bar change");
    },
  })),
)(LogfileView);