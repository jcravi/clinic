import React, { useState } from 'react';
import styled from 'styled-components';
import { DailyQuantity } from './DailyQuantity';

const StyledRow = styled.tr<{ light: boolean }>`
  & input::placeholder,
  & div[contentEditable='true']:empty:not(:focus):before {
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
    & input::placeholder,
    & div[contentEditable='true']:empty:not(:focus):before {
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

const Input = styled.input`
  border: none;
  padding-top: 0px;
  padding-bottom: 0px;
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
  const [dailySize, setDailySize] = useState(1);

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
          <div style={{ flexGrow: 2, textAlign: 'left' }}>
            <Input
              style={{ width: '100%' }}
              type='text'
              autoComplete='off'
              placeholder='Medicine Name, Type &amp; Strength'
              onChange={entered}
              onBlur={removed}
            />
          </div>
          <div>
            <Input
              style={{ width: '100px' }}
              type='text'
              placeholder='Quantity'
            />
          </div>
        </div>
        <Dosage light={light}>
          {Array(dailySize)
            .fill('')
            .map((_, i) => {
              const changedDates = ({
                target: { value },
              }: React.ChangeEvent<HTMLInputElement>) => {
                if (i === dailySize - 1 && value.length !== 0) {
                  setDailySize(dailySize + 1);
                }
              };
              const removedDate = ({
                target: { value },
              }: React.ChangeEvent<HTMLInputElement>) => {
                if (i !== dailySize - 1 && value.length === 0) {
                  setDailySize(dailySize - 1);
                }
              };
              return (
                <DailyQuantity
                  key={`daily-${index}-${i}`}
                  light={light}
                  changedDates={changedDates}
                  removedDate={removedDate}
                />
              );
            })}
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
