import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const kanchanInfo: LetterHeadStateType = {
  name: 'Dr. Kanchan Janardhan',
  degrees: 'MBBS, MS(ENT), DORL, DYE, PGDHHCM',
  reg: '45225',
  days: 'Tue/Fri',
  times1: '10 am to 1 pm',
  times2: '6 pm to 8 pm',
  print: false,
};

const slice = createSlice({
  name: 'letterHead',
  initialState,
  reducers: {
    printLetterHead: (state, { payload }: PayloadAction<boolean>) => {
      state.print = payload;
    },
    switchDoctor: (state) => {
      if (state.reg === '45341') {
        return kanchanInfo;
      }
      return initialState;
    },
  },
});

export const { printLetterHead, switchDoctor } = slice.actions;
export const { reducer: letterHeadReducer } = slice;
