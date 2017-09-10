import { map } from 'lodash';
import { array } from 'prop-types';
import React from 'react';

const ContentView = ({ contents }) => (
  <div>
    {
      map(contents, (content, index) => (
        <div key={`content.view.${index}`}>
          <div>{content.id+1}</div>
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