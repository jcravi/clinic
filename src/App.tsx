import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import { LetterHead } from './components/LetterHead';
import { PrintButton } from './components/PrintButton';
import { Sheet } from './components/Sheet';
import { Audiogram } from './components/Audiogram';
import { Common } from './components/Common';

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

const Navigator = styled.div`
  font-size: 13px;
  position: fixed;
  top: 10px;
  left: 10px;
  border-radius: 4px;
  box-shadow: 0 0 10px gray;
  background-color: white;
  padding: 10px;
  & > div {
    border-bottom: 1px dashed grey;
    padding-bottom: 5px;
  }
  & > div:hover {
    border-bottom: 1px solid grey;
    padding-bottom: 5px;
  }
  & a {
    text-decoration: none;
  }
  @media print {
    display: none;
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
        <Common />
        <BrowserRouter>
          <Navigator>
            <div>
              <Link to='/precriptions'>Prescriptions</Link>
            </div>
            <div>
              <Link to='/audiogram'>Audiogram</Link>
            </div>
          </Navigator>
          <Switch>
            <Route path='/precriptions'>
              <Sheet />
            </Route>
            <Route path='/audiogram'>
              <Audiogram />
            </Route>
          </Switch>
        </BrowserRouter>
      </OverallDiv>
    </>
  );
};
