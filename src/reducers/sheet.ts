import { CLEAR, ClearAction } from '../actions/clear';
import {
  DOSAGE_ADD,
  DOSAGE_REMOVE,
  PRESCRIPTION_ADD,
  PRESCRIPTION_REMOVE,
  SET_DOSAGE,
  SET_PRESCRIPTION,
  SET_SHEET,
  SheetActions,
} from '../actions/sheets';
import {
  IDailyDosageInputs,
  IPrescriptionInputs,
  ISheetInputs,
} from '../interfaces';

const blankDosage = {
  morning: '',
  afternoon: '',
  night: '',
  dates: '',
};

const newDosage = () => {
  return Object.assign({}, blankDosage);
};

const blankPrescription = {
  medicineName: '',
  quantity: '',
  notes: '',
  dosages: [newDosage()],
};

const newPrescription = () => {
  return Object.assign({}, blankPrescription);
};

const defaultSheet = {
  diagnosis: '',
  procedureDone: '',
  instructions: '',
  prescriptions: [newPrescription(), newPrescription()],
};

export const sheetReducer = (
  state = defaultSheet,
  action: SheetActions | ClearAction
): ISheetInputs & {
  prescriptions: Array<
    IPrescriptionInputs & { dosages: Array<IDailyDosageInputs> }
  >;
} => {
  switch (action.type) {
    case CLEAR:
      return defaultSheet;
    case SET_SHEET:
      return {
        ...state,
        [action.name]: action.value,
      };
    case PRESCRIPTION_ADD:
      return {
        ...state,
        prescriptions: [...state.prescriptions, newPrescription()],
      };
    case PRESCRIPTION_REMOVE:
      return {
        ...state,
        prescriptions: state.prescriptions.slice(0, -1),
      };
    case DOSAGE_ADD: {
      const newPrescriptions = state.prescriptions.map((item, index) => {
        if (index === action.prescriptionIndex) {
          return { ...item, dosages: [...item.dosages, newDosage()] };
        } else {
          return item;
        }
      });
      return {
        ...state,
        prescriptions: newPrescriptions,
      };
    }
    case DOSAGE_REMOVE: {
      const newPrescriptions = state.prescriptions.map((item, index) => {
        if (index === action.prescriptionIndex) {
          return { ...item, dosages: item.dosages.slice(0, -1) };
        } else {
          return item;
        }
      });
      return {
        ...state,
        prescriptions: newPrescriptions,
      };
    }
    case SET_PRESCRIPTION: {
      const newPrescriptions = state.prescriptions.map((item, index) => {
        if (index === action.index) {
          return { ...item, [action.name]: action.value };
        } else {
          return item;
        }
      });
      return {
        ...state,
        prescriptions: newPrescriptions,
      };
    }
    case SET_DOSAGE:
      const newPrescriptionsWithDosage = state.prescriptions.map(
        (item, prescriptionIndex) => {
          if (prescriptionIndex === action.prescriptionIndex) {
            const newDosages = item.dosages.map((dosage, dosageIndex) => {
              if (dosageIndex === action.index) {
                return {
                  ...dosage,
                  [action.name]: action.value,
                };
              } else {
                return dosage;
              }
            });
            return {
              ...item,
              dosages: newDosages,
            };
          } else {
            return item;
          }
        }
      );
      return {
        ...state,
        prescriptions: newPrescriptionsWithDosage,
      };
    default:
      return state;
  }
};
