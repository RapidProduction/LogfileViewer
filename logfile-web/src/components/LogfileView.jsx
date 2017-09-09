import React from "react";

import Searchbar from "./Searchbar.jsx";
import ContentView from "./ContentView.jsx";

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

export default LogfileView;