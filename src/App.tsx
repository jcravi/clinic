import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Label } from './components/Label';
import { LetterHead } from './components/LetterHead';
import { Prescription } from './components/Prescription';
import { PrintButton } from './components/PrintButton';

const OverallDiv = styled.div<{ printLetterHead: boolean }>`
  padding-top: 10px;
  padding-left: 50px;
  padding-right: 50px;
  font-size: 17px;
  @media print {
    padding-top: ${({ printLetterHead }) =>
      printLetterHead ? '10mm' : '80mm'};
  }
`;

const labels: Array<string> = ['Name', 'Diagnosis', 'Procedure\u202fdone'];

export const App = () => {
  const date = new Date().toLocaleDateString('en-IN');
  const [printLetterHead, setPrintLetterHead] = useState(false);
  const [print, setPrint] = useState(false);

  useEffect(() => {
    if (print) {
      setPrint(false);
      window.print();
    }
  }, [print]);

  return (
    <>
      <PrintButton
        setPrintLetterHead={setPrintLetterHead}
        setPrint={setPrint}
      />
      <LetterHead printLetterHead={printLetterHead} />
      <OverallDiv printLetterHead={printLetterHead}>
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
      </OverallDiv>
    </>
  );
};
