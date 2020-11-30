import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

const Div = styled.div<{ light: boolean }>`
  display: flex;
  border-top: ${({ light }) =>
    light ? '1px dotted lightgray' : '1px dotted gray'};
  & > div {
    text-align: center;
    flex-grow: 1;
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
  width: 100px;
  @media print {
    visibility: ${({ light }) => (light ? 'hidden' : 'visible')};
  }
`;

type DailyQuantityProps = {
  light: boolean;
  changedDates: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removedDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const DailyQuantity = ({
  light,
  changedDates,
  removedDate,
}: DailyQuantityProps) => {
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
          <DailyQuantityItem
            key={time}
            time={time}
            light={light}
            handleChanged={handleChanged}
          />
        );
      })}
      <div>
        <DateInput
          placeholder='Days'
          onChange={changedDates}
          onBlur={removedDate}
        />
      </div>
    </Div>
  );
};

type ItemProps = {
  time: string;
  light: boolean;
  handleChanged: (event: ChangeEvent<HTMLInputElement>) => void;
};

const DailyQuantityItem = ({ time, light, handleChanged }: ItemProps) => {
  return (
    <Item light={light}>
      <div>
        <NumberInput onChange={handleChanged} />
      </div>
      {time}
    </Item>
  );
};
