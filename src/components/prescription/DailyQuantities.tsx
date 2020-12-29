import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { DosageStateType } from '../../slices/sheet';

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
  position: relative;
  z-index: 1;
  &:focus {
    z-index: 2;
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
  dosages: Array<DosageStateType>;
  onDosageChange: (index: number, name: string, value: string) => void;
  addDosage: () => void;
  removeDosage: () => void;
};

export const DailyQuantities = ({
  rowIndex,
  light,
  dosages,
  onDosageChange,
  addDosage,
  removeDosage,
}: DailyQuantitiesProps) => {
  return (
    <>
      <Div light={light}>
        <Item light={light}>Morning</Item>
        <Item light={light}>Afternoon</Item>
        <Item light={light}>Night</Item>
        <ItemDate style={{ paddingLeft: '10px', textAlign: 'left' }}>
          Dates
        </ItemDate>
      </Div>
      {dosages.map((_, i) => {
        const changedDates = ({
          target: { value },
        }: React.ChangeEvent<HTMLInputElement>) => {
          if (i === dosages.length - 1 && value.length !== 0) {
            addDosage();
          }
        };
        const removedDate = ({
          target: { value },
        }: React.ChangeEvent<HTMLInputElement>) => {
          if (i !== dosages.length - 1 && value.length === 0) {
            removeDosage();
          }
        };

        const onChange = ({
          target: { name, value },
        }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          onDosageChange(i, name as keyof DosageStateType, value);
        };
        return (
          <DailyQuantityRow
            key={`daily-${rowIndex}-${i}`}
            light={light}
            dosage={dosages[i]}
            changedDates={changedDates}
            removedDate={removedDate}
            onChange={onChange}
          />
        );
      })}
    </>
  );
};

type DailyQuantityRowProps = {
  light: boolean;
  dosage: DosageStateType;
  changedDates: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removedDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const DailyQuantityRow = ({
  light,
  changedDates,
  removedDate,
  dosage,
  onChange,
}: DailyQuantityRowProps) => {
  const timeOfDay = ['Morning', 'Afternoon', 'Night'].map((time) => ({
    time,
    light: true,
  }));
  const [times, setTimes] = useState(timeOfDay);

  const onChangeDates = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    changedDates(event);
  };

  return (
    <Div light={light}>
      {times.map(({ time, light }, index) => {
        const handleChanged = (event: ChangeEvent<HTMLInputElement>) => {
          onChange(event);
          const {
            target: { value },
          } = event;
          const timesCopy = [...times];
          timesCopy[index] = {
            time,
            light: value === '0',
          };
          setTimes(timesCopy);
        };
        const name = time.toLowerCase() as keyof DosageStateType;
        return (
          <Item key={time} light={light}>
            <NumberInput
              onChange={handleChanged}
              name={name}
              value={dosage[name]}
            />
          </Item>
        );
      })}
      <ItemDate>
        <DateInput
          placeholder='Dates'
          onChange={onChangeDates}
          onBlur={removedDate}
          name='dates'
          value={dosage.dates}
        />
      </ItemDate>
    </Div>
  );
};
