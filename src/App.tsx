import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import { LetterHead } from './components/common/LetterHead';
import { PrintButton } from './components/common/PrintButton';
import { Sheet } from './components/prescription/Sheet';
import { Audiogram } from './components/audiogram/Audiogram';
import { Common } from './components/common/Common';

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
    border-bottom: 1px solid black;
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
      <LetterHead printLetterHead={printLetterHead} />
      <OverallDiv printLetterHead={printLetterHead}>
        <Common />
        <BrowserRouter>
          <Navigator>
            <div>
              <Link to='/'>
                <div>Clear</div>
              </Link>
            </div>
            <div>
              <Link to='/precription'>
                <div>Prescription</div>
              </Link>
            </div>
            <div>
              <Link to='/audiogram'>
                <div>Audiogram</div>
              </Link>
            </div>
          </Navigator>
          <Switch>
            <Route path='/precription'>
              <Sheet />
            </Route>
            <Route path='/audiogram'>
              <Audiogram />
            </Route>
            <Route path='/'>{null}</Route>
          </Switch>
        </BrowserRouter>
      </OverallDiv>
      <PrintButton
        setPrintLetterHead={setPrintLetterHead}
        setPrint={setPrint}
      />
    </>
  );
};
