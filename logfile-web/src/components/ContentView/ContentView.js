import { map } from 'lodash';
import { array } from 'prop-types';
import React from 'react';

import './ContentView.scss';

const ContentView = ({ contents }) => (
  <div className="content-view__container">
    {
      map(contents, (content, index) => (
        <div
          className="content-view__content"
          key={`content.view.${index}`}>
          <div
            className="content-view__line-number">
            {content.id+1}
          </div>
          <div>{content.content}</div>
        </div>
      ))
    }
  </div>
);

ContentView.propTypes = {
  contents: array.isRequired,
};

ContentView.defaultProps = {
  contents: [],
};

export default ContentView;