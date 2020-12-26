import {
  AudiogramTextType,
  ChartType,
  ICommon,
  IDailyDosage,
  IPrescription,
  ISheetInputs,
  PointsType,
} from '../interfaces/index';

import {
  PRINT_LETTER_HEAD,
  PrintLetterHeadAction,
  STARTED_PRINT,
  StartedPrintAction,
  CLEAR,
  ClearAction,
  SET_COMMON,
  SetCommonInputAction,
  SET_SHEET,
  SetSheetInputAction,
  PRESCRIPTION_ADD,
  PrescriptionAddAction,
  PRESCRIPTION_REMOVE,
  PrescriptionRemoveAction,
  SET_PRESCRIPTION,
  SetPrescriptionInputAction,
  SetDosageInputAction,
  SET_DOSAGE,
  DosageAddAction,
  DosageRemoveAction,
  DOSAGE_REMOVE,
  DOSAGE_ADD,
  SetPointAction,
  SET_POINT,
  SetAudiogramInputAction,
  SET_AUDIOGRAM_TEXT,
} from './types';

export const printLetterHead = (print: boolean): PrintLetterHeadAction => ({
  type: PRINT_LETTER_HEAD,
  printLetterHead: print,
});

export const startedPrint = (): StartedPrintAction => ({
  type: STARTED_PRINT,
});

export const clear = (): ClearAction => ({ type: CLEAR });

export const setCommonInput = (
  name: keyof ICommon,
  value: string
): SetCommonInputAction => ({
  type: SET_COMMON,
  name,
  value,
});

export const setSheetInput = (
  name: keyof ISheetInputs,
  value: string
): SetSheetInputAction => ({
  type: SET_SHEET,
  name,
  value,
});

export const addPrescription = (): PrescriptionAddAction => ({
  type: PRESCRIPTION_ADD,
});

export const removePrescription = (): PrescriptionRemoveAction => ({
  type: PRESCRIPTION_REMOVE,
});

export const setPrescription = (
  index: number,
  name: keyof IPrescription,
  value: string
): SetPrescriptionInputAction => ({
  type: SET_PRESCRIPTION,
  index,
  name,
  value,
});

export const setDosage = (
  prescriptionIndex: number,
  index: number,
  name: keyof IDailyDosage,
  value: string
): SetDosageInputAction => ({
  type: SET_DOSAGE,
  prescriptionIndex,
  index,
  name,
  value,
});

export const addDosage = (prescriptionIndex: number): DosageAddAction => ({
  type: DOSAGE_ADD,
  prescriptionIndex,
});

export const removeDosage = (
  prescriptionIndex: number
): DosageRemoveAction => ({
  type: DOSAGE_REMOVE,
  prescriptionIndex,
});

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

export const setAudiogramInput = (
  name: keyof AudiogramTextType,
  value: string
): SetAudiogramInputAction => ({
  type: SET_AUDIOGRAM_TEXT,
  name,
  value,
});
