import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;

  font-weight: bold;
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

export const PrintButton = () => {
  const print = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    window.print();
  };

  return <StyledButton onClick={print}>&#128438; Print</StyledButton>;
};
