import { X_AXIS } from '../utils/chart-utils';

export interface ILetterHeadInputs {
  name: string;
  degrees: string;
  reg: string;
  days: string;
  times1: string;
  times2: string;
  print: boolean;
}

export interface ICommonInputs {
  fileNo: string;
  opdNo: string;
  name: string;
  ageSex: string;
  address: string;
}

export interface IDailyDosageInputs {
  morning: string;
  afternoon: string;
  night: string;
  dates: string;
}

export interface IPrescriptionInputs {
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

export interface IAudiogramInputs {
  remarks: string;
  hearingAidTrial: string;
}

export interface StateInterface {
  letterHead: ILetterHeadInputs;
  common: ICommonInputs;
  sheet: ISheetInputs & {
    prescriptions: Array<
      IPrescriptionInputs & { dosages: Array<IDailyDosageInputs> }
    >;
  };
  chart: ChartType;
  audiogram: IAudiogramInputs;
  print: boolean;
}
