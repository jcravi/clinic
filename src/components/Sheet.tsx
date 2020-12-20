import React from 'react';

import { Label } from './Label';
import { Prescription } from './Prescription';

const labels: Array<string> = ['Name', 'Diagnosis', 'Procedure\u202fdone'];

export const Sheet = () => {
  const date = new Date().toLocaleDateString('en-IN');
  return (
    <>
      <div style={{ textAlign: 'right' }}>Date: {date}</div>
      <div>
        {labels.map((name) => {
          return <Label name={name} key={name} />;
        })}
      </div>
      <div style={{ fontSize: '50px' }}>{'\u211E'}</div>
      <div>
        <Prescription />
      </div>
      <div style={{ paddingTop: '50px' }}>
        <Label name='Instructions' />
      </div>
    </>
  );
};
