import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clear } from './clear';

export interface CommonStateType {
  fileNo: string;
  opdNo: string;
  name: string;
  ageSex: string;
  address: string;
}

const initialState: CommonStateType = {
  fileNo: '',
  opdNo: '',
  name: '',
  ageSex: '',
  address: '',
};

interface NameValue {
  name: keyof CommonStateType;
  value: string;
}

const slice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCommonInput: (state, { payload }: PayloadAction<NameValue>) => {
      state[payload.name] = payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clear, () => initialState);
  },
});

export const { setCommonInput } = slice.actions;
export const { reducer: commonReducer } = slice;
