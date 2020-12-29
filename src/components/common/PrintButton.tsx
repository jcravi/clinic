import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { RootStateType } from '../../slices';
import { startedPrint } from '../../slices/print';
import { printLetterHead } from '../../slices/letterHead';

const ButtonPlacement = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;

  font-weight: bold;
  & > div {
    text-align: right;
    margin-bottom: 10px;
  }
`;

const StyledButton = styled.button`
  padding: 4px 10px;
  text-decoration: none;
  border-radius: 4px;
  border: 1px solid gray;
  background: linear-gradient(to bottom, whitesmoke 0%, lightgray 100%);

  &:hover {
    border-color: black;
    background: linear-gradient(to bottom, lightgray 0%, whitesmoke 100%);
  }
  &:active {
    top: 11px;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 10px gray;
  }

  @media print {
    display: none;
  }
`;

const PrintButtonComponent = ({
  printLetterHead,
  startedPrint,
  print,
}: ReturnType<typeof mapState> & typeof mapDispatch) => {
  useEffect(() => {
    if (print) {
      startedPrint();
      window.print();
    }
  }, [print, startedPrint]);

  return (
    <ButtonPlacement>
      <div>
        <StyledButton onClick={() => printLetterHead(true)}>
          &#128438; LetterHead
        </StyledButton>
      </div>
      <div>
        <StyledButton onClick={(e) => printLetterHead(false)}>
          &#128438; Print
        </StyledButton>
      </div>
    </ButtonPlacement>
  );
};

const mapState = ({ print }: RootStateType) => ({
  print,
});

const mapDispatch = {
  printLetterHead,
  startedPrint,
};

export const PrintButton = connect(mapState, mapDispatch)(PrintButtonComponent);
