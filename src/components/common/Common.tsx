import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setCommonInput } from '../../actions';

import { ICommon, StateInterface } from '../../interfaces';
import { StyledLabel } from './CommonComponents';
import { Label } from './Label';

const Input = styled.input.attrs((_) => ({
  type: 'text',
}))`
  width: 60px;
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

const CommonComponent = ({
  fileNo,
  opdNo,
  name,
  ageSex,
  address,
  setCommon,
}: ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps) => {
  const date = new Date().toLocaleDateString('en-IN');

  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCommon(name as keyof ICommon, value);
  };

  return (
    <>
      <Top>
        <div>
          <label>
            File No:{' '}
            <Input
              maxLength={7}
              name='fileNo'
              value={fileNo}
              onChange={onChange}
            />
          </label>
        </div>
        <div>
          <label>
            OPD No:{' '}
            <Input
              maxLength={7}
              name='opdNo'
              value={opdNo}
              onChange={onChange}
            />
          </label>
        </div>
        <div>Date: {date}</div>
      </Top>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <StyledLabel style={{ width: '100%' }}>
          Name:{' '}
          <Input
            maxLength={65}
            autoComplete='off'
            style={{ width: '100%' }}
            name='name'
            value={name}
            onChange={onChange}
          />
        </StyledLabel>
        <StyledLabel>
          Age/Sex:{' '}
          <Input
            maxLength={7}
            style={{ width: '70px' }}
            name='ageSex'
            value={ageSex}
            onChange={onChange}
          />
        </StyledLabel>
      </div>
      <div>
        <Label
          inputName='address'
          name='Address'
          value={address}
          onChange={onChange}
        />
      </div>
    </>
  );
};

const mapStateToProps = ({
  common: { fileNo, opdNo, name, ageSex, address },
}: StateInterface) => ({ fileNo, opdNo, name, ageSex, address });

const mapDispatchToProps = {
  setCommon: setCommonInput,
};

export const Common = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonComponent);
