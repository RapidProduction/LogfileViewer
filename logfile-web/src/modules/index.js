import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  logfileReducer,
  logfileEpic,
} from '././logfile-module';

export const rootEpic = combineEpics(
  logfileEpic,
);

export const rootReducer = combineReducers({
  form: formReducer,
  logfile: logfileReducer,
});