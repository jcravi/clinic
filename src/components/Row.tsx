import React from 'react';
import styled from 'styled-components';
import { DailyQuantities } from './DailyQuantities';
import { Input } from './Input';
import { MedicineName } from './MedicineName';
import { MiddleColumn, NotesColumn, SerialColumn, TableRow } from './Table';

const StyledRow = styled(TableRow)<{ light: boolean }>`
  & input::placeholder {
    color: ${({ light }) => (light ? 'lightgray' : 'gray')};
  }

  border-top: 1px solid gray !important;
  border-bottom: ${({ light }) => (light ? '1px dotted lightgray' : 'none')};

  & > div {
    padding: 0 0 0 0;
    border-color: ${({ light }) => (light ? 'lightgray' : 'gray')};
    border-style: ${({ light }) => (light ? 'dotted' : 'solid')};
    color: ${({ light }) => (light ? 'lightgray' : 'black')};
  }

  & input[type='number']::-webkit-outer-spin-button,
  & input[type='number']::-webkit-inner-spin-button {
    opacity: ${({ light }) => (light ? 0.3 : 1.0)};
  }

  @media print {
    display: ${({ light }) => (light ? 'none' : 'auto')};
    border: none !important;
    border-top: 1px dotted gray !important;
    & input::placeholder {
      color: transparent;
    }
  }
`;

const Dosage = styled.div<{ light: boolean }>`
  color: ${({ light }) => (light ? 'lightgray' : 'black')};
  border-top: 1px ${({ light }) => (light ? 'dotted lightgray' : 'solid gray')} !important;
  @media print {
    border-top: none !important;
  }
`;

const TextArea = styled.textarea<{ light: boolean }>`
  vertical-align: top;
  width: 99px;
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

const NameSection = styled.div<{ light: boolean }>`
  display: flex;
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
      <MiddleColumn>
        <NameSection light={light}>
          <MedicineName entered={entered} removed={removed} />
          <div style={{ width: '101px' }}>
            <Input
              style={{ width: '100px' }}
              type='text'
              placeholder='Quantity'
            />
          </div>
        </NameSection>
        <Dosage light={light}>
          <DailyQuantities rowIndex={index} light={light} />
        </Dosage>
      </MiddleColumn>
      <NotesColumn>
        <TextArea light={light} placeholder='Notes' onInput={onTextAreaInput} />
      </NotesColumn>
    </StyledRow>
  );
};
