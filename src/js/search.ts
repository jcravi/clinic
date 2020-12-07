import medicines from '../assets/medicine-array.json';

type MedicineType = {
  type: string;
  form: string;
  name: string;
  generic: string;
  strength: string;
  notes: string;
};

export type SearchResult = MedicineType & {
  searchStr: string;
  searchStrLower: string;
  score: number;
};

export const search = (userEntered: string): Array<SearchResult> => {
  const array: Array<SearchResult> = [];

  // converting the word to search in multiple ways
  const val = userEntered.replace(/[^0-9a-z ]/gi, '');
  const lowerVal = val.toLowerCase();

  const words: Array<string> = val.split(' ');
  const wordsLower = lowerVal.split(' ');

  const rexStr = '.*' + val.split('').join('.*');

  const rexCase = new RegExp(rexStr);
  const rex = new RegExp(rexStr, 'i');

  // Loop only once
  for (const item of medicines) {
    let score = 0;
    // full user search starts
    if (item.searchStr.startsWith(val)) {
      score += 5;
    }

    // full user search case insensitive start
    if (item.searchStrLower.startsWith(lowerVal)) {
      score += 5;
    }

    // full user search
    if (item.searchStr.includes(val)) {
      score += 3;
    }

    // full user search case insensitive
    if (item.searchStrLower.includes(lowerVal)) {
      score += 3;
    }

    // search for words
    for (const word of words) {
      if (item.searchStr.includes(word)) {
        score += 2;
      }
    }

    // search for words case insensitive
    for (const word of wordsLower) {
      if (item.searchStrLower.includes(word)) {
        score += 2;
      }
    }

    // search individual letters
    if (rexCase.test(item.searchStr)) {
      score++;
    }

    if (rex.test(item.searchStrLower)) {
      score++;
    }
    array.push({ ...item, score });
  }

  return array.filter((x) => x.score !== 0).sort((a, b) => b.score - a.score);
};
