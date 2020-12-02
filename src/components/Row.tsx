import React from 'react';
import styled from 'styled-components';
import { DailyQuantities } from './DailyQuantities';
import { Input } from './Input';
import { MedicineName } from './MedicineName';

const StyledRow = styled.tr<{ light: boolean }>`
  & input::placeholder {
    color: ${({ light }) => (light ? 'lightgray' : 'gray')};
  }

  & td {
    padding: 0 0 0 0;
    border: ${({ light }) =>
      light ? '1px dotted lightgray' : '1px solid gray'};
    color: ${({ light }) => (light ? 'lightgray' : 'black')};
  }

  & input[type='number']::-webkit-outer-spin-button,
  & input[type='number']::-webkit-inner-spin-button {
    opacity: ${({ light }) => (light ? 0.3 : 1.0)};
  }

  @media print {
    display: ${({ light }) => (light ? 'none' : 'auto')};
    & input::placeholder {
      color: transparent;
    }
  }
`;

const Dosage = styled.div<{ light: boolean }>`
  color: ${({ light }) => (light ? 'lightgray' : 'black')};
  @media print {
    border-top: none;
  }
`;

const SerialColumn = styled.td`
  width: 20px;
  color: black;
  vertical-align: top;
  text-align: center;
`;

const TextArea = styled.textarea<{ light: boolean }>`
  vertical-align: top;
  width: 100px;
  height: 75px;
  border: none;
  overflow: hidden;
  resize: vertical;
  padding-top: 0px;
  padding-bottom: 0px;
  &::placeholder {
    color: ${({ light }) => (light ? 'lightgray' : 'gray')};
  }
  &::-webkit-resizer {
    display: none;
  }
  @media print {
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: transparent;
    }
  }
`;

type RowProps = {
  size: number;
  index: number;
  entered: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removed: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Row = ({ size, index, entered, removed }: RowProps) => {
  const light = index === size;

  const onTextAreaInput = ({
    currentTarget,
  }: React.FormEvent<HTMLTextAreaElement>) => {
    currentTarget.style.height = '75px';
    currentTarget.style.height = `${currentTarget.scrollHeight}px`;
  };

  return (
    <StyledRow light={light}>
      <SerialColumn>{index}</SerialColumn>
      <td>
        <div style={{ display: 'flex' }}>
          <MedicineName entered={entered} removed={removed} />
          <div>
            <Input
              style={{ width: '100px' }}
              type='text'
              placeholder='Quantity'
            />
          </div>
        </div>
        <Dosage light={light}>
          <DailyQuantities rowIndex={index} light={light} />
        </Dosage>
      </td>
      <td
        style={{
          width: '100px',
          verticalAlign: 'top',
          textAlign: 'left',
        }}
      >
        <TextArea light={light} placeholder='Notes' onInput={onTextAreaInput} />
      </td>
    </StyledRow>
  );
};
