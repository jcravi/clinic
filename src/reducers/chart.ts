import { CLEAR, ClearAction } from '../actions/clear';
import { SetPointAction, SET_POINT } from '../actions/chart';
import { ChartType, PointsType } from '../interfaces';
import { X_AXIS } from '../utils/chart-utils';

const blankPoints = X_AXIS.reduce(
  (o, key) => ({ ...o, [key]: '' }),
  {} as PointsType
);

const newPoints = () => {
  return Object.assign({}, blankPoints);
};

const blankChart: ChartType = {
  rightAir: newPoints(),
  rightBone: newPoints(),
  leftAir: newPoints(),
  leftBone: newPoints(),
};

const newChart = () => {
  return Object.assign({}, blankChart);
};

export const chartReducer = (
  chart = newChart(),
  action: SetPointAction | ClearAction
): ChartType => {
  switch (action.type) {
    case CLEAR:
      return newChart();
    case SET_POINT:
      return {
        ...chart,
        [action.sideKey]: {
          ...chart[action.sideKey],
          [action.name]: action.value,
        },
      };
    default:
      return chart;
  }
};
