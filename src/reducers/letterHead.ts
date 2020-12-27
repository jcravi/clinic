import { CLEAR, ClearAction } from '../actions/clear';
import {
  PRINT_LETTER_HEAD,
  PrintLetterHeadAction,
} from '../actions/letterHead';

const defaultLetterHead = {
  name: 'Dr. Janardhan N. C.',
  degrees: 'MBBS, MS(ENT), DORL, PGDHHCM',
  reg: '45341',
  days: 'Mon/Wed/Thur/Sat',
  times1: '10 am to 1 pm',
  times2: '5 pm to 8 pm',
  print: false,
};

export const letterHeadReducer = (
  state = defaultLetterHead,
  action: PrintLetterHeadAction | ClearAction
): typeof defaultLetterHead => {
  switch (action.type) {
    case CLEAR:
      return defaultLetterHead;
    case PRINT_LETTER_HEAD:
      return {
        ...state,
        print: action.printLetterHead,
      };
    default:
      return state;
  }
};
