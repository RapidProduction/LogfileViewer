import React from "react";
import './Searchbar.scss';

const Searchbar = () => (
  <div className="searchbar-container">
    <input
      className="searchbar-input"
      type="text"
      placeholder="path/to/file"
    />
  </div>
);

export default Searchbar;