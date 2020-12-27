import { ChartType, PointsType } from '../interfaces';

export const SET_POINT = 'SET_POINT';

export interface SetPointAction {
  type: typeof SET_POINT;
  sideKey: keyof ChartType;
  name: keyof PointsType;
  value: string;
}

export const setPoint = (
  sideKey: keyof ChartType,
  name: keyof PointsType,
  value: string
): SetPointAction => ({
  type: SET_POINT,
  sideKey,
  name,
  value,
});
