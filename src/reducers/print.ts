import { CLEAR, ClearAction } from '../actions/clear';
import {
  PrintLetterHeadAction,
  PRINT_LETTER_HEAD,
} from '../actions/letterHead';
import { StartedPrintAction, STARTED_PRINT } from '../actions/print';

export const printReducer = (
  state = false,
  action: StartedPrintAction | PrintLetterHeadAction | ClearAction
): boolean => {
  switch (action.type) {
    case STARTED_PRINT:
    case CLEAR:
      return false;
    case PRINT_LETTER_HEAD:
      return true;
    default:
      return state;
  }
};
