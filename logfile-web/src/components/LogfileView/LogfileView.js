import {
  isNil,
  get,
} from 'lodash';
import {
  array,
  object,
  func,
} from 'prop-types';
import React from 'react';

import ContentView from '../ContentView';
import ErrorView from '../ErrorView/';
import LandingView from '../LandingView';
import LoadingView from '../LoadingView';
import Searchbar from '../Searchbar';

import './LogfileView.scss';

const LogfileView = ({
  // props
  logfileContents, error, isLoading,
  // events
  onSearchClick, onBackToBeginning,
  onBack, onNext, onNextToEnd,
}) => (
  <div className="logfile-view__container">
    <Searchbar handleSubmit={onSearchClick} />
    {
      !isLoading && isNil(error) && isNil(logfileContents) ?
      <LandingView
        title={"Welcome to logfile view application"}
        description={"Please fill in the filename where it in \
          the directory /var/tmp/ then click view to see logfile content. \
          Logfile system support in-memory cachcing where it cache data in memory \
          so you can access logfile more faster."} /> :
        isLoading ?
        <LoadingView
          title={"Loading..."}
          description={"Loading file content, please wait a second"} /> :
        isNil(error) ?
          <ContentView contents={logfileContents}/> :
          <ErrorView
            title={"There is some error occur"}
            description={"Please click here to try to reload again or check your filename thoroughly"}
            clickHandler={onSearchClick} />
    }
    <div className="logfile-view__container__control">
      <button
        disabled={error || get(logfileContents ,'length', 0) <= 0}
        onClick={onBackToBeginning}>
        {"|<"}
      </button>
      <button
        disabled={error || get(logfileContents ,'length', 0) <= 0}
        onClick={onBack}>
        {"<"}
      </button>
      <button
        disabled={error || get(logfileContents ,'length', 0) <= 0}
        onClick={onNext}>
        {">"}
      </button>
      <button
        disabled={error || get(logfileContents ,'length', 0) <= 0}
        onClick={onNextToEnd}>
        {">|"}
      </button>
    </div>
  </div>
);

LogfileView.propTypes = {
  error: object,
  logfileContents: array,
  onSearchClick: func,
  onBackToBeginning: func,
  onBack: func,
  onNext: func,
};

export default LogfileView;