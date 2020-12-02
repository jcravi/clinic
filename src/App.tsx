import React from 'react';
import styled from 'styled-components';

import { Label } from './components/Label';
import { Prescription } from './components/Prescription';
import { PrintButton } from './components/PrintButton';

const OverallDiv = styled.div`
  padding-top: 50px;
  padding-left: 50px;
  padding-right: 50px;
  @media print {
    padding-top: 75mm;
  }
`;

const labels: Array<string> = ['Name', 'Diagnosis', 'Procedure\u202fdone'];

export const App = () => {
  return (
    <>
      <PrintButton />
      <OverallDiv>
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
      </OverallDiv>
    </>
  );
};
