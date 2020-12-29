import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT, X_AXIS } from '../contants/chart';
import { clear } from './clear';

export type PointsType = {
  [key in typeof X_AXIS[number]]: string;
};

export interface ChartStateType {
  rightAir: PointsType;
  rightBone: PointsType;
  leftAir: PointsType;
  leftBone: PointsType;
}

const initialPoints = X_AXIS.reduce(
  (o, key) => ({ ...o, [key]: DEFAULT }),
  {} as PointsType
);

const initialState: ChartStateType = {
  rightAir: initialPoints,
  rightBone: initialPoints,
  leftAir: initialPoints,
  leftBone: initialPoints,
};

interface ActionType {
  sideKey: keyof ChartStateType;
  name: keyof PointsType;
  value: string;
}

const slice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setPoint: (state, { payload }: PayloadAction<ActionType>) => {
      state[payload.sideKey][payload.name] = payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clear, () => initialState);
  },
});

export const { setPoint } = slice.actions;
export const { reducer: chartReducer } = slice;
