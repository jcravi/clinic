import { CLEAR, ClearAction } from '../actions/clear';
import { SetCommonInputAction, SET_COMMON } from '../actions/common';
import { ICommonInputs } from '../interfaces';

const defaultCommon: ICommonInputs = {
  fileNo: '',
  opdNo: '',
  name: '',
  ageSex: '',
  address: '',
};

export const commonReducer = (
  state = defaultCommon,
  action: SetCommonInputAction | ClearAction
): ICommonInputs => {
  switch (action.type) {
    case CLEAR:
      return defaultCommon;
    case SET_COMMON:
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
};
