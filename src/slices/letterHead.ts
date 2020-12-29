import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clear } from './clear';

export interface LetterHeadStateType {
  name: string;
  degrees: string;
  reg: string;
  days: string;
  times1: string;
  times2: string;
  print: boolean;
}

const initialState: LetterHeadStateType = {
  name: 'Dr. Janardhan N. C.',
  degrees: 'MBBS, MS(ENT), DORL, PGDHHCM',
  reg: '45341',
  days: 'Mon/Wed/Thur/Sat',
  times1: '10 am to 1 pm',
  times2: '5 pm to 8 pm',
  print: false,
};

const slice = createSlice({
  name: 'letterHead',
  initialState,
  reducers: {
    printLetterHead: (state, { payload }: PayloadAction<boolean>) => {
      state.print = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clear, () => initialState);
  },
});

export const { printLetterHead } = slice.actions;
export const { reducer: letterHeadReducer } = slice;
