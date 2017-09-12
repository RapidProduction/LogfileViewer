import React from 'react';
import {
  func,
  string,
} from 'prop-types';

import './ErrorView.scss';

const LandingView = ({
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

LandingView.propTypes = {
  title: string,
  description: string,
  clickHandler: func,
};

LandingView.defaultProps = {
  title: string,
  description: string,
  clickHandler: func,
};

export default LandingView;
