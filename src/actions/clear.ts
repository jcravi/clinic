export const CLEAR = 'CLEAR';

export interface ClearAction {
  type: typeof CLEAR;
}

export const clear = (): ClearAction => ({ type: CLEAR });
