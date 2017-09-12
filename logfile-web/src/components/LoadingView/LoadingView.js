import React from 'react';
import { string } from 'prop-types';

import './LoadingView.scss';

const LoadingView = ({
  // props
  title, description,
}) => (
  <div className="loading-view__container">
    <div className="loading-view__content">
      <div className="loading-view__content__title">{title}</div>
      <div className="loading-view__content__description">{description}</div>
    </div>
  </div>
);

LoadingView.propTypes = {
  title: string,
  description: string,
};

LoadingView.defaultProps = {
  title: "Loading...",
  description: "Loading file content, please wait a second",
};

export default LoadingView;
