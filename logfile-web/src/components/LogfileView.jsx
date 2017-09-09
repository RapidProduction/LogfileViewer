import React from "react";

import Searchbar from "./Searchbar.jsx";
import ContentView from "./ContentView.jsx";

const contents = [
  {
    id: 2,
    value: "ABC",
  },
  {
    id: 3,
    value: "ABC",
  },
  {
    id: 4,
    value: "ABC",
  },
  {
    id: 4,
    value: "ABC",
  },
];
const LogfileView = ({
  // props
  logfileContents,
  // events
  onSearchbarChange, onSerchClick,
  onBackToBeginning, onBack,
  onNext, onNextToEnd,
}) => (
  <div className="container">
    <Searchbar />
    <button>View</button>
    <ContentView contents={contents}/>
    <div className="control_container">
      <button onClick={onBackToBeginning}>{"|<"}</button>
      <button onClick={onBack}>{"<"}</button>
      <button onClick={onNext}>{">"}</button>
      <button onClick={onNextToEnd}>{">|"}</button>
    </div>
  </div>
);

export default LogfileView;