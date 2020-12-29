import { createSlice } from '@reduxjs/toolkit';
import { clear } from './clear';
import { printLetterHead } from './letterHead';

const initialState: boolean = false;

const slice = createSlice({
  name: 'print',
  initialState,
  reducers: {
    startedPrint: () => false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(clear, () => initialState)
      .addCase(printLetterHead, () => true);
  },
});

export const { startedPrint } = slice.actions;
export const { reducer: printReducer } = slice;
