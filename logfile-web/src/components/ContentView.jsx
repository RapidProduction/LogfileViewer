import { map } from "lodash";
import React from "react";

const ContentView = ({ contents }) => (
  <div>
    {
      map(contents, (content) => (
        <div>
          <div>{content.id}</div>
          <div>{content.value}</div>
        </div>
      ))
    }
  </div>
);

export default ContentView;