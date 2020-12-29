import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { DosageStateType, PrescriptionTextType } from '../../slices/sheet';
import { DailyQuantities } from './DailyQuantities';
import { Input } from './Input';
import { MedicineName } from './MedicineName';
import { MiddleColumn, NotesColumn, SerialColumn, TableRow } from './Table';

const StyledRow = styled(TableRow)<{ light: boolean }>`
  & input::placeholder {
    color: ${({ light }) => (light ? 'lightgray' : 'darkgray')};
  }

  border-top: 1px solid darkgray !important;
  border-bottom: ${({ light }) => (light ? '1px dotted lightgray' : 'none')};

  & > div {
    padding: 0 0 0 0;
    border-color: ${({ light }) => (light ? 'lightgray' : 'darkgray')};
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
    border-top: 1px dotted darkgray !important;
    & input::placeholder {
      color: transparent;
    }
  }
`;

const Dosage = styled.div<{ light: boolean }>`
  color: ${({ light }) => (light ? 'lightgray' : 'black')};
  border-top: 1px
    ${({ light }) => (light ? 'dotted lightgray' : 'solid darkgray')} !important;
  @media print {
    border-top: none !important;
  }
`;

const TextArea = styled.textarea<{ light: boolean }>`
  vertical-align: top;
  width: 99px;
  height: 78px;
  border: none;
  overflow: hidden;
  resize: vertical;
  padding-top: 0px;
  padding-bottom: 0px;
  &::placeholder {
    color: ${({ light }) => (light ? 'lightgray' : 'darkgray')};
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
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeMedicineName: (value: string) => void;
  onDosageChange: (index: number, name: string, value: string) => void;
  dosages: Array<DosageStateType>;
  addDosage: () => void;
  removeDosage: () => void;
} & PrescriptionTextType;

export const Row = ({
  size,
  index,
  entered,
  removed,
  medicineName,
  quantity,
  notes,
  onChange,
  onChangeMedicineName,
  onDosageChange,
  dosages,
  addDosage,
  removeDosage,
}: RowProps) => {
  const light = index === size - 1;

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = '78px';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [notes]);

  return (
    <StyledRow light={light}>
      <SerialColumn>{index + 1}</SerialColumn>
      <MiddleColumn>
        <NameSection light={light}>
          <MedicineName
            entered={entered}
            removed={removed}
            value={medicineName}
            onChange={onChangeMedicineName}
          />
          <div style={{ width: '101px' }}>
            <Input
              style={{ width: '100px' }}
              type='text'
              placeholder='Quantity'
              name='quantity'
              value={quantity}
              onChange={onChange}
            />
          </div>
        </NameSection>
        <Dosage light={light}>
          <DailyQuantities
            rowIndex={index}
            light={light}
            dosages={dosages}
            addDosage={addDosage}
            removeDosage={removeDosage}
            onDosageChange={onDosageChange}
          />
        </Dosage>
      </MiddleColumn>
      <NotesColumn>
        <TextArea
          ref={ref}
          light={light}
          placeholder='Notes'
          name='notes'
          value={notes}
          onChange={onChange}
        />
      </NotesColumn>
    </StyledRow>
  );
};
