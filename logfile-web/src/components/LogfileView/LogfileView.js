import {
  array,
  func,
} from 'prop-types';
import React from "react";

import ContentView from "../ContentView";
import Searchbar from "../Searchbar";

const LogfileView = ({
  // props
  logfileContents,
  // events
  onSearchbarChange, onSearchClick,
  onBackToBeginning, onBack,
  onNext, onNextToEnd,
}) => (
  <div className="container">
    <Searchbar />
    <button onClick={onSearchClick}>View</button>
    <ContentView contents={logfileContents}/>
    <div className="control_container">
      <button onClick={onBackToBeginning}>{"|<"}</button>
      <button onClick={onBack}>{"<"}</button>
      <button onClick={onNext}>{">"}</button>
      <button onClick={onNextToEnd}>{">|"}</button>
    </div>
  </div>
);

LogfileView.propTypes = {
  logfileContents: array,
  onSearchbarChange: func,
  onSearchClick: func,
  onBackToBeginning: func,
  onBack: func,
  onNext: func,
};

export default LogfileView;