export const HEIGHT = 275;
export const WIDTH = 375;
export const OFFSET = 40;

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

export const X_INCREMENT = (WIDTH - 2 * OFFSET) / X_AXIS.length;
export const Y_INCREMENT = (HEIGHT - 2 * OFFSET) / (Y_AXIS.length - 1);
