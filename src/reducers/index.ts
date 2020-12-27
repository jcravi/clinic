import { combineReducers } from 'redux';
import { audiogramReducer } from './audiogram';
import { chartReducer } from './chart';
import { commonReducer } from './common';
import { letterHeadReducer } from './letterHead';
import { printReducer } from './print';
import { sheetReducer } from './sheet';

export const reducer = combineReducers({
  chart: chartReducer,
  audiogram: audiogramReducer,
  common: commonReducer,
  sheet: sheetReducer,
  letterHead: letterHeadReducer,
  print: printReducer,
});
