export const PRINT_LETTER_HEAD = 'PRINT_LETTER_HEAD';

export interface PrintLetterHeadAction {
  type: typeof PRINT_LETTER_HEAD;
  printLetterHead: boolean;
}

export const printLetterHead = (print: boolean): PrintLetterHeadAction => ({
  type: PRINT_LETTER_HEAD,
  printLetterHead: print,
});
