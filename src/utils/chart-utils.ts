import { PointsType } from '../interfaces';

export const height = 275;
export const width = 375;
export const offset = 40;

export const DEFAULT = '';

export const X_AXIS = ['125', '250', '500', '1k', '2k', '4k', '6k'] as const;
export const Y_AXIS = [
  '120',
  '100',
  '80',
  '60',
  '40',
  '20',
  '0',
  '-20',
] as const;

export const xInc = (width - 2 * offset) / X_AXIS.length;
export const yInc = (height - 2 * offset) / (Y_AXIS.length - 1);

export const calcX = (index: number): number => {
  return offset + (index + 1) * xInc;
};

export const calcY = (value: string): number => {
  return offset + ((+value / 10) * yInc) / 2 + yInc;
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
