import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StyledLabel } from './CommonComponents';
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

type StateType = {
  fileNo: string;
  opdNo: string;
  name: string;
  ageSex: string;
  Address: string;
};

const initState: StateType = {
  fileNo: '',
  opdNo: '',
  name: '',
  ageSex: '',
  Address: '',
};

type CommonProps = {
  clear: boolean;
};

export const Common = ({ clear }: CommonProps) => {
  const date = new Date().toLocaleDateString('en-IN');

  const [state, setState] = useState(initState);

  useEffect(() => {
    if (clear) {
      setState(initState);
    }
  }, [clear]);

  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newState = { ...state, [name]: value } as StateType;
    setState(newState);
  };

  return (
    <>
      <Top>
        <div>
          <label>
            File No:{' '}
            <Input name='fileNo' value={state.fileNo} onChange={onChange} />
          </label>
        </div>
        <div>
          <label>
            OPD No:{' '}
            <Input name='opdNo' value={state.opdNo} onChange={onChange} />
          </label>
        </div>
        <div>Date: {date}</div>
      </Top>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <StyledLabel style={{ width: '100%' }}>
          Name:&nbsp;
          <Input
            maxLength={65}
            autoComplete='off'
            style={{ width: '100%' }}
            name='name'
            value={state.name}
            onChange={onChange}
          />
        </StyledLabel>
        <StyledLabel>
          Age/Sex:&nbsp;
          <Input
            maxLength={7}
            style={{ width: '70px' }}
            name='ageSex'
            value={state.ageSex}
            onChange={onChange}
          />
        </StyledLabel>
      </div>
      <div>
        <Label name='Address' value={state.Address} onChange={onChange} />
      </div>
    </>
  );
};
