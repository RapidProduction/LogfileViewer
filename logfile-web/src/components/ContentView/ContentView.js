import { map } from 'lodash';
import { array } from 'prop-types';
import React from 'react';

import './ContentView.scss';

const ContentView = ({ contents }) => (
  <div className="content-view__container">
    {
      contents.length > 0 ?
      <table className="content-view__content">
        <tbody>
        {
          map(contents, (content, index) => (
            <tr
              className="content__cell"
              key={`content.view.${index}`}>
              <td
                className="content-view__content__cell__line-number">
                {content.id+1}
              </td>
              <td className="content-view__content__cell__content">
                {content.content}
              </td>
            </tr>
          ))
        }
        </tbody>
      </table> :
      <div> Loading... </div>
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