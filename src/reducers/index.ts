import {
  ActionTypes,
  CLEAR,
  PRINT_LETTER_HEAD,
  SET_COMMON,
  STARTED_PRINT,
  SET_SHEET,
  PRESCRIPTION_REMOVE,
  PRESCRIPTION_ADD,
  SET_PRESCRIPTION,
  SET_DOSAGE,
  DOSAGE_ADD,
  DOSAGE_REMOVE,
  SET_POINT,
  SET_AUDIOGRAM_TEXT,
} from '../actions/types';
import { ChartType, StateInterface, PointsType } from '../interfaces';
import { X_AXIS } from '../utils/chart-utils';

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

const blankPoints = X_AXIS.reduce(
  (o, key) => ({ ...o, [key]: '' }),
  {} as PointsType
);

const newPoints = () => {
  return Object.assign({}, blankPoints);
};

const blankChart: ChartType = {
  rightAir: newPoints(),
  rightBone: newPoints(),
  leftAir: newPoints(),
  leftBone: newPoints(),
};

const newChart = () => {
  return Object.assign({}, blankChart);
};

const defaultState: StateInterface = {
  letterHead: {
    name: 'Dr. Janardhan N. C.',
    degrees: 'MBBS, MS(ENT), DORL, PGDHHCM',
    reg: '45341',
    days: 'Mon/Wed/Thur/Sat',
    times1: '10 am to 1 pm',
    times2: '5 pm to 8 pm',
    print: false,
  },
  common: {
    fileNo: '',
    opdNo: '',
    name: '',
    ageSex: '',
    address: '',
  },
  sheet: {
    diagnosis: '',
    procedureDone: '',
    instructions: '',
    prescriptions: [newPrescription(), newPrescription()],
  },
  print: false,
  chart: newChart(),
  audiogram: {
    remarks: '',
    hearingAidTrial: '',
  },
};

export const reducer = (
  state = defaultState,
  action: ActionTypes
): StateInterface => {
  switch (action.type) {
    case CLEAR:
      return defaultState;
    case PRINT_LETTER_HEAD:
      return {
        ...state,
        letterHead: {
          ...state.letterHead,
          print: action.printLetterHead,
        },
        print: true,
      };
    case STARTED_PRINT:
      return {
        ...state,
        print: false,
      };
    case SET_COMMON:
      return {
        ...state,
        common: {
          ...state.common,
          [action.name]: action.value,
        },
      };
    case SET_SHEET:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          [action.name]: action.value,
        },
      };
    case PRESCRIPTION_ADD:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          prescriptions: [...state.sheet.prescriptions, newPrescription()],
        },
      };
    case PRESCRIPTION_REMOVE:
      return {
        ...state,
        sheet: {
          ...state.sheet,
          prescriptions: state.sheet.prescriptions.slice(0, -1),
        },
      };
    case DOSAGE_ADD: {
      const newPrescriptions = state.sheet.prescriptions.map((item, index) => {
        if (index === action.prescriptionIndex) {
          return { ...item, dosages: [...item.dosages, newDosage()] };
        } else {
          return item;
        }
      });
      return {
        ...state,
        sheet: {
          ...state.sheet,
          prescriptions: newPrescriptions,
        },
      };
    }
    case DOSAGE_REMOVE: {
      const newPrescriptions = state.sheet.prescriptions.map((item, index) => {
        if (index === action.prescriptionIndex) {
          return { ...item, dosages: item.dosages.slice(0, -1) };
        } else {
          return item;
        }
      });
      return {
        ...state,
        sheet: {
          ...state.sheet,
          prescriptions: newPrescriptions,
        },
      };
    }
    case SET_PRESCRIPTION: {
      const newPrescriptions = state.sheet.prescriptions.map((item, index) => {
        if (index === action.index) {
          return { ...item, [action.name]: action.value };
        } else {
          return item;
        }
      });
      return {
        ...state,
        sheet: {
          ...state.sheet,
          prescriptions: newPrescriptions,
        },
      };
    }
    case SET_DOSAGE:
      const newPrescriptionsWithDosage = state.sheet.prescriptions.map(
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
        sheet: {
          ...state.sheet,
          prescriptions: newPrescriptionsWithDosage,
        },
      };
    case SET_POINT:
      return {
        ...state,
        chart: {
          ...state.chart,
          [action.sideKey]: {
            ...state.chart[action.sideKey],
            [action.name]: action.value,
          },
        },
      };
    case SET_AUDIOGRAM_TEXT:
      return {
        ...state,
        audiogram: {
          ...state.audiogram,
          [action.name]: action.value,
        },
      };
    default:
      return state;
  }
};
