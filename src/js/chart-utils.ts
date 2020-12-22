export const height = 275;
export const width = 400;
export const offset = 40;

export const X_AXIS = ['125', '250', '500', '1k', '2k', '4k', '6k'];
export const Y_AXIS = ['0', '20', '40', '60', '80', '100', '120'];

export const xInc = (width - 2 * offset) / X_AXIS.length;
export const yInc = (height - 2 * offset) / (Y_AXIS.length - 1);

export const calcX = (index: number): number => {
  return offset + (index + 1) * xInc;
};

export const calcY = (value: number): number => {
  return height - offset - ((value / 10) * yInc) / 2;
};
