import React from 'react';
import { string } from 'prop-types';

import './LandingView.scss';

const LandingView = ({
  // props
  title, description,
}) => (
  <div className="landing-view__container">
    <div className="landing-view__content__title">{title}</div>
    <div className="landing-view__content__description">{description}</div>
  </div>
);

LandingView.propTypes = {
  title: string,
  description: string,
};

LandingView.defaultProps = {
  title: "Welcome to logfile view application",
  description: "Please fill in the filename and click view to see logfile content",
};

export default LandingView;
