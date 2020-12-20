import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Chart } from './components/Chart';

import { LetterHead } from './components/LetterHead';
import { PrintButton } from './components/PrintButton';
import { Sheet } from './components/Sheet';

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

export const App = () => {
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
        {/* <Sheet /> */}
        <Chart />
      </OverallDiv>
    </>
  );
};
