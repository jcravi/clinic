import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { LetterHead } from './components/common/LetterHead';
import { PrintButton } from './components/common/PrintButton';
import { Sheet } from './components/prescription/Sheet';
import { Audiogram } from './components/audiogram/Audiogram';
import { Common } from './components/common/Common';

import { RootStateType } from './slices';
import { clear } from './slices/clear';

const GlobalStyle = createGlobalStyle<{ printLetterHead: boolean }>`

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff;
}

section {
  margin: 0;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  page-break-after: always;
  width: 210mm;
  height: 296mm;
}

button,
input,
optgroup,
select,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

label {
  display: inline-block;
  margin-bottom: 0.5rem;
}

*,
::after,
::before {
  box-sizing: border-box;
}

@page {
  size: A4;
}

/** For screen preview **/
@media screen {
  body {
    background: #e0e0e0;
  }
  section {
    background: white;
    box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
    margin: 5mm auto;
  }
}

/** Fix for Chrome issue #273306 **/
@media print {
  body {
    width: ${({ printLetterHead }) => (printLetterHead ? '210mm' : '187mm')};
  }
  @page {
    size: ${({ printLetterHead }) => (printLetterHead ? 'A4' : '187mm 255mm')};
    margin: 0;
  }
  section {
    margin: 0;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    page-break-after: always;
    width: ${({ printLetterHead }) => (printLetterHead ? '210mm' : '187mm')};
    height: ${({ printLetterHead }) => (printLetterHead ? '296mm' : '255mm')};
  }
}
`;

const OverallDiv = styled.div<{ printLetterHead: boolean }>`
  padding-top: 10px;
  padding-left: 50px;
  padding-right: 50px;
  font-size: 17px;
  @media print {
    padding-top: ${({ printLetterHead }) =>
      printLetterHead ? '10mm' : '60mm'};
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
    border-bottom: 1px dashed blue;
    padding-bottom: 5px;
  }
  & > div:hover {
    border-bottom: 1px solid blue;
    padding-bottom: 5px;
  }
  & a {
    text-decoration: none;
  }
  & a:visited {
    color: blue;
  }
  @media print {
    display: none;
  }
`;

const AppComponent = ({
  printLetterHead,
  clear,
}: ReturnType<typeof mapState> & typeof mapDispatch) => {
  return (
    <>
      <GlobalStyle printLetterHead={printLetterHead} />
      <LetterHead />
      <OverallDiv printLetterHead={printLetterHead}>
        <Common />
        <BrowserRouter>
          <Navigator>
            <div>
              <Link to='/' onClick={clear}>
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
      <PrintButton />
    </>
  );
};

const mapState = ({ letterHead: { print } }: RootStateType) => ({
  printLetterHead: print,
});

const mapDispatch = {
  clear,
};

export const App = connect(mapState, mapDispatch)(AppComponent);
