import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clear } from './clear';

export interface DosageStateType {
  morning: string;
  afternoon: string;
  night: string;
  dates: string;
}

export interface PrescriptionTextType {
  medicineName: string;
  quantity: string;
  notes: string;
}

export interface SheetTextType {
  diagnosis: string;
  procedureDone: string;
  instructions: string;
}

export type SheetStateType = SheetTextType & {
  prescriptions: Array<
    PrescriptionTextType & { dosages: Array<DosageStateType> }
  >;
};

const initialDosage: DosageStateType = {
  morning: '',
  afternoon: '',
  night: '',
  dates: '',
};

const initialPrescription = {
  medicineName: '',
  quantity: '',
  notes: '',
  dosages: [initialDosage],
};

const initialState = {
  diagnosis: '',
  procedureDone: '',
  instructions: '',
  prescriptions: [initialPrescription, initialPrescription],
};

interface SheetAction {
  name: keyof SheetTextType;
  value: string;
}

interface PrescriptionAction {
  index: number;
  name: keyof PrescriptionTextType;
  value: string;
}

interface DosageAction {
  pIndex: number;
  index: number;
  name: keyof DosageStateType;
  value: string;
}

const slice = createSlice({
  name: 'sheet',
  initialState,
  reducers: {
    setSheetInput: (state, { payload }: PayloadAction<SheetAction>) => {
      state[payload.name] = payload.value;
    },
    addPrescription: (state) => {
      state.prescriptions.push(initialPrescription);
    },
    removePrescription: (state) => {
      state.prescriptions.pop();
    },
    setPrescription: (
      state,
      { payload }: PayloadAction<PrescriptionAction>
    ) => {
      state.prescriptions[payload.index][payload.name] = payload.value;
    },
    addDosage: (state, { payload }: PayloadAction<{ index: number }>) => {
      state.prescriptions[payload.index].dosages.push(initialDosage);
    },
    removeDosage: (state, { payload }: PayloadAction<{ index: number }>) => {
      state.prescriptions[payload.index].dosages.pop();
    },
    setDosage: (
      state,
      { payload: { pIndex, index, name, value } }: PayloadAction<DosageAction>
    ) => {
      state.prescriptions[pIndex].dosages[index][name] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clear, () => initialState);
  },
});

export const {
  setSheetInput,
  addPrescription,
  removePrescription,
  setPrescription,
  addDosage,
  removeDosage,
  setDosage,
} = slice.actions;
export const { reducer: sheetReducer } = slice;
