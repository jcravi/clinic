import React from 'react';
import styled from 'styled-components';

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

export const PrintButton = ({
  setPrintLetterHead,
  setPrint,
}: {
  setPrintLetterHead: React.Dispatch<React.SetStateAction<boolean>>;
  setPrint: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const print = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    printLetterHead: boolean
  ): void => {
    setPrintLetterHead(printLetterHead);
    event.preventDefault();
    setPrint(true);
  };

  return (
    <ButtonPlacement>
      <div>
        <StyledButton onClick={(e) => print(e, true)}>
          &#128438; LetterHead
        </StyledButton>
      </div>
      <div>
        <StyledButton onClick={(e) => print(e, false)}>
          &#128438; Print
        </StyledButton>
      </div>
    </ButtonPlacement>
  );
};
