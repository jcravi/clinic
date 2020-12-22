import React from 'react';
import styled from 'styled-components';
import { Label } from './Label';

const Input = styled.input.attrs((_) => ({
  type: 'text',
}))`
  width: 50px;
  border: none;
  border-bottom: 1px dotted grey;
  text-align: left;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    opacity: 1;
  }
  &:focus {
    outline: transparent;
    border-bottom: 1px solid gray;
  }
  @media print {
    border: none;
    &:focus {
      border: none;
      outline: none;
    }
    &::placeholder {
      color: transparent;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: flex-end;
  & > div {
    padding-left: 20px;
  }
`;

export const Common = () => {
  const date = new Date().toLocaleDateString('en-IN');
  return (
    <>
      <Top>
        <div>
          <label>
            File No: <Input />
          </label>
        </div>
        <div>
          <label>
            OPD No: <Input />
          </label>
        </div>
        <div>Date: {date}</div>
      </Top>
      <div>
        <Label name='Name' />
      </div>
    </>
  );
};
