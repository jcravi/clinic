const medicines = require('./excel.json');

const array = [];

const toSearchString = ({ form, type, name, generic }) => {
  return `${type} ${form} ${name} ${generic}`;
};

for (const medicine of medicines) {
  if (medicine.name.length > 0) {
    const forms = medicine.form.split('/');
    for (const form of forms) {
      let item = { ...medicine };
      if (form === 'Tab') {
        item.form = 'Tablet';
      } else if (form === 'Syr' || form === 'syrup' || form === 'susp') {
        item.form = 'Syrup';
      } else if (form === 'Cap') {
        item.form = 'Capsule';
      } else {
        continue;
      }

      item.generic = item.generic.replace(/\+/g, ' + ').replace(/  /g, ' ');
      item.searchStr = toSearchString(item);
      item.searchStrLower = item.searchStr.toLowerCase();
      item.score = 0;
      array.push(item);
    }
  }
}

//console.log(JSON.stringify(array, null, 2));
const fs = require('fs');
fs.writeFileSync(
  './src/assets/medicine-array.json',
  JSON.stringify(array, null, 2)
);
