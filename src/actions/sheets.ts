import {
  IDailyDosageInputs,
  IPrescriptionInputs,
  ISheetInputs,
} from '../interfaces';

export const SET_SHEET = 'SET_SHEET';
export const SET_PRESCRIPTION = 'SET_PRESCRIPTION';
export const SET_DOSAGE = 'SET_DOSAGE';
export const PRESCRIPTION_ADD = 'PRESCRIPTION_ADD';
export const PRESCRIPTION_REMOVE = 'PRESCRIPTION_REMOVE';

export const DOSAGE_ADD = 'DOSAGE_ADD';
export const DOSAGE_REMOVE = 'DOSAGE_REMOVE';

export interface SetSheetInputAction {
  type: typeof SET_SHEET;
  name: keyof ISheetInputs;
  value: string;
}

export interface SetPrescriptionInputAction {
  type: typeof SET_PRESCRIPTION;
  index: number;
  name: keyof IPrescriptionInputs;
  value: string;
}

export interface SetDosageInputAction {
  type: typeof SET_DOSAGE;
  prescriptionIndex: number;
  index: number;
  name: keyof IDailyDosageInputs;
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
  name: keyof IPrescriptionInputs,
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
  name: keyof IDailyDosageInputs,
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

export type SheetActions =
  | SetSheetInputAction
  | PrescriptionAddAction
  | PrescriptionRemoveAction
  | SetPrescriptionInputAction
  | SetDosageInputAction
  | DosageAddAction
  | DosageRemoveAction;
