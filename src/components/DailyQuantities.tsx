import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

const Div = styled.div<{ light: boolean }>`
  display: flex;
  border-top: ${({ light }) =>
    light ? '1px dotted lightgray' : '1px dotted gray'};
  @media print {
    border-top: none;
  }
`;

const NumberInput = styled.input.attrs((_) => ({
  type: 'number',
  placeholder: '0',
  min: 0,
  max: 99,
}))`
  width: 40px;
  border: none;
  text-align: center;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    opacity: 1;
  }
  @media print {
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

const DateInput = styled.input`
  width: 100%;
  border: none;
  @media print {
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: transparent;
    }
  }
`;

const Item = styled.div<{ light: boolean }>`
  width: 120px;
  text-align: center;
  @media print {
    visibility: ${({ light }) => (light ? 'hidden' : 'visible')};
  }
`;

const ItemDate = styled.div`
  flex-grow: 1;
  padding-left: 10px;
  text-align: left;
  & input {
    text-align: left;
  }
`;

type DailyQuantitiesProps = {
  rowIndex: number;
  light: boolean;
};

export const DailyQuantities = ({ rowIndex, light }: DailyQuantitiesProps) => {
  const [dailySize, setDailySize] = useState(1);
  return (
    <>
      <Div light={light}>
        <Item light={light}>Morning</Item>
        <Item light={light}>Afternoon</Item>
        <Item light={light}>Night</Item>
        <ItemDate style={{ paddingLeft: '12px' }}>Dates</ItemDate>
      </Div>
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
            <DailyQuantityRow
              key={`daily-${rowIndex}-${i}`}
              light={light}
              changedDates={changedDates}
              removedDate={removedDate}
            />
          );
        })}
    </>
  );
};

type DailyQuantityRowProps = {
  light: boolean;
  changedDates: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removedDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DailyQuantityRow = ({
  light,
  changedDates,
  removedDate,
}: DailyQuantityRowProps) => {
  const timeOfDay = ['Morning', 'Afternoon', 'Night'].map((time) => ({
    time,
    light: true,
  }));
  const [times, setTimes] = useState(timeOfDay);

  return (
    <Div light={light}>
      {times.map(({ time, light }, index) => {
        const handleChanged = ({
          target: { value },
        }: ChangeEvent<HTMLInputElement>) => {
          const timesCopy = [...times];
          timesCopy[index] = {
            time,
            light: value === '0',
          };
          setTimes(timesCopy);
        };
        return (
          <Item key={time} light={light}>
            <NumberInput onChange={handleChanged} />
          </Item>
        );
      })}
      <ItemDate>
        <DateInput
          placeholder='Dates'
          onChange={changedDates}
          onBlur={removedDate}
        />
      </ItemDate>
    </Div>
  );
};
