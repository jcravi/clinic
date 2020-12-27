import { ICommonInputs } from '../interfaces';

export const SET_COMMON = 'SET_COMMON';

export interface SetCommonInputAction {
  type: typeof SET_COMMON;
  name: keyof ICommonInputs;
  value: string;
}

export const setCommonInput = (
  name: keyof ICommonInputs,
  value: string
): SetCommonInputAction => ({
  type: SET_COMMON,
  name,
  value,
});
