import { combineReducers } from 'redux';

import { audiogramReducer, AudiogramStateType } from './audiogram';
import { chartReducer, ChartStateType } from './chart';
import { commonReducer, CommonStateType } from './common';
import { letterHeadReducer, LetterHeadStateType } from './letterHead';
import { printReducer } from './print';
import { sheetReducer, SheetStateType } from './sheet';

export interface RootStateType {
  letterHead: LetterHeadStateType;
  common: CommonStateType;
  sheet: SheetStateType;
  chart: ChartStateType;
  audiogram: AudiogramStateType;
  print: boolean;
}

export const reducer = combineReducers({
  chart: chartReducer,
  audiogram: audiogramReducer,
  common: commonReducer,
  sheet: sheetReducer,
  letterHead: letterHeadReducer,
  print: printReducer,
});
