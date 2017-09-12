import React from 'react';
import {
  func,
  string,
} from 'prop-types';

import './ErrorView.scss';

const ErrorView = ({
  // props
  title, description,
  // events
  clickHandler,
}) => (
  <div
    className="error-view__container"
    onClick={clickHandler}>
    <div className="error-view__content__title">{title}</div>
    <div className="error-view__content__description">{description}</div>
  </div>
);

ErrorView.propTypes = {
  title: string,
  description: string,
  clickHandler: func,
};

ErrorView.defaultProps = {
  title: "There is some error occur",
  description: "Please click here to try to reload again",
};

export default ErrorView;
