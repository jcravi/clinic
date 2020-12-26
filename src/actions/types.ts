import {
  ChartType,
  ICommon,
  IDailyDosage,
  IPrescription,
  ISheetInputs,
  PointsType,
  AudiogramTextType,
} from '../interfaces';

export const CLEAR = 'CLEAR';
export const PRINT_LETTER_HEAD = 'PRINT_LETTER_HEAD';
export const STARTED_PRINT = 'STARTED_PRINT';
export const SET_COMMON = 'SET_COMMON';
export const SET_SHEET = 'SET_SHEET';
export const SET_PRESCRIPTION = 'SET_PRESCRIPTION';
export const SET_DOSAGE = 'SET_DOSAGE';
export const PRESCRIPTION_ADD = 'PRESCRIPTION_ADD';
export const PRESCRIPTION_REMOVE = 'PRESCRIPTION_REMOVE';

export const DOSAGE_ADD = 'DOSAGE_ADD';
export const DOSAGE_REMOVE = 'DOSAGE_REMOVE';

export const SET_POINT = 'SET_POINT';
export const SET_AUDIOGRAM_TEXT = 'SET_AUDIOGRAM_TEXT';

export interface PrintLetterHeadAction {
  type: typeof PRINT_LETTER_HEAD;
  printLetterHead: boolean;
}

export interface StartedPrintAction {
  type: typeof STARTED_PRINT;
}

export interface ClearAction {
  type: typeof CLEAR;
}

export interface SetCommonInputAction {
  type: typeof SET_COMMON;
  name: keyof ICommon;
  value: string;
}

export interface SetSheetInputAction {
  type: typeof SET_SHEET;
  name: keyof ISheetInputs;
  value: string;
}

export interface SetPrescriptionInputAction {
  type: typeof SET_PRESCRIPTION;
  index: number;
  name: keyof IPrescription;
  value: string;
}

export interface SetDosageInputAction {
  type: typeof SET_DOSAGE;
  prescriptionIndex: number;
  index: number;
  name: keyof IDailyDosage;
  value: string;
}

export interface PrescriptionAddAction {
  type: typeof PRESCRIPTION_ADD;
}

export interface PrescriptionRemoveAction {
  type: typeof PRESCRIPTION_REMOVE;
}

export interface DosageAddAction {
  type: typeof DOSAGE_ADD;
  prescriptionIndex: number;
}

export interface DosageRemoveAction {
  type: typeof DOSAGE_REMOVE;
  prescriptionIndex: number;
}

export interface SetPointAction {
  type: typeof SET_POINT;
  sideKey: keyof ChartType;
  name: keyof PointsType;
  value: string;
}

export interface SetAudiogramInputAction {
  type: typeof SET_AUDIOGRAM_TEXT;
  name: keyof AudiogramTextType;
  value: string;
}

export type ActionTypes =
  | PrintLetterHeadAction
  | StartedPrintAction
  | ClearAction
  | SetCommonInputAction
  | SetSheetInputAction
  | SetPrescriptionInputAction
  | PrescriptionAddAction
  | PrescriptionRemoveAction
  | SetDosageInputAction
  | DosageAddAction
  | DosageRemoveAction
  | SetPointAction
  | SetAudiogramInputAction;
