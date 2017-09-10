import React from "react";
import './Searchbar.scss';

const Searchbar = () => (
  <div className="searchbar__container">
    <input
      className="searchbar__input"
      type="text"
      placeholder="path/to/file"
    />
  </div>
);

export default Searchbar;