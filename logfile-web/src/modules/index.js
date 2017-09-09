import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import {
  logfileReducer,
  logfileEpic,
} from '././logfile-module';

export const rootEpic = combineEpics(
  logfileEpic,
);

export const rootReducer = combineReducers({
  logfile: logfileReducer,
});