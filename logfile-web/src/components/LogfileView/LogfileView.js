import {
  array,
  func,
} from 'prop-types';
import React from 'react';

import ContentView from '../ContentView';
import Searchbar from '../Searchbar';

import './LogfileView.scss';

const LogfileView = ({
  // props
  logfileContents,
  // events
  onSearchClick, onBackToBeginning,
  onBack, onNext, onNextToEnd,
}) => (
  <div className="logfile-view__container">
    <Searchbar handleSubmit={onSearchClick} />
    <ContentView contents={logfileContents}/>
    <div className="logfile-view__container__control">
      <button
        disabled={logfileContents.length <= 0}
        onClick={onBackToBeginning}>
        {"|<"}
      </button>
      <button
        disabled={logfileContents.length <= 0}
        onClick={onBack}>
        {"<"}
      </button>
      <button
        disabled={logfileContents.length <= 0}
        onClick={onNext}>
        {">"}
      </button>
      <button
        disabled={logfileContents.length <= 0}
        onClick={onNextToEnd}>
        {">|"}
      </button>
    </div>
  </div>
);

LogfileView.propTypes = {
  logfileContents: array,
  onSearchClick: func,
  onBackToBeginning: func,
  onBack: func,
  onNext: func,
};

export default LogfileView;