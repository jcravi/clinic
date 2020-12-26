import { X_AXIS } from '../utils/chart-utils';

export interface ILetterHead {
  name: string;
  degrees: string;
  reg: string;
  days: string;
  times1: string;
  times2: string;
  print: boolean;
}

export interface ICommon {
  fileNo: string;
  opdNo: string;
  name: string;
  ageSex: string;
  address: string;
}

export interface IDailyDosage {
  morning: string;
  afternoon: string;
  night: string;
  dates: string;
}

export interface IPrescription {
  medicineName: string;
  quantity: string;
  notes: string;
}

export interface ISheetInputs {
  diagnosis: string;
  procedureDone: string;
  instructions: string;
}

export type PointsType = {
  [key in typeof X_AXIS[number]]: string;
};

export interface ChartType {
  rightAir: PointsType;
  rightBone: PointsType;
  leftAir: PointsType;
  leftBone: PointsType;
}

export interface AudiogramTextType {
  remarks: string;
  hearingAidTrial: string;
}

export interface StateInterface {
  letterHead: ILetterHead;
  common: ICommon;
  sheet: ISheetInputs & {
    prescriptions: Array<IPrescription & { dosages: Array<IDailyDosage> }>;
  };
  chart: ChartType;
  audiogram: AudiogramTextType;
  print: boolean;
}
