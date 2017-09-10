import { map } from "lodash";
import React from "react";

const ContentView = ({ contents }) => (
  <div>
    {
      map(contents, (content, index) => (
        <div key={`content.view.${index}`}>
          <div>{content.id}</div>
          <div>{content.value}</div>
        </div>
      ))
    }
  </div>
);

export default ContentView;