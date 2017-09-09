import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import App from './App';
import './index.css';
import { rootEpic, rootReducer } from './modules';
import registerServiceWorker from './registerServiceWorker';

const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
