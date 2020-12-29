import {
  DEFAULT,
  OFFSET,
  X_INCREMENT,
  X_AXIS,
  Y_INCREMENT,
} from '../contants/chart';
import { PointsType } from '../slices/chart';

export const calcX = (index: number): number => {
  return OFFSET + (index + 1) * X_INCREMENT;
};

export const calcY = (value: string): number => {
  return OFFSET + ((+value / 10) * Y_INCREMENT) / 2 + Y_INCREMENT;
};

export const toPointsLine = (points: PointsType) => {
  return X_AXIS.reduce((acc, curr, index) => {
    if (points[curr] !== DEFAULT) {
      const cx = calcX(index);
      const cy = calcY(points[curr]);
      return acc + ' ' + cx + ',' + cy;
    } else {
      return acc;
    }
  }, '');
};
