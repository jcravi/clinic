import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clear } from './clear';

export interface AudiogramStateType {
  remarks: string;
  hearingAidTrial: string;
}

const initialState: AudiogramStateType = {
  remarks: '',
  hearingAidTrial: '',
};

interface NameValue {
  name: keyof AudiogramStateType;
  value: string;
}

const slice = createSlice({
  name: 'audiogram',
  initialState,
  reducers: {
    setAudiogramInput: (state, { payload }: PayloadAction<NameValue>) => {
      state[payload.name] = payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clear, () => initialState);
  },
});

export const { setAudiogramInput } = slice.actions;
export const { reducer: audiogramReducer } = slice;
