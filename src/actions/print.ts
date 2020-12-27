export const STARTED_PRINT = 'STARTED_PRINT';

export interface StartedPrintAction {
  type: typeof STARTED_PRINT;
}

export const startedPrint = (): StartedPrintAction => ({
  type: STARTED_PRINT,
});
