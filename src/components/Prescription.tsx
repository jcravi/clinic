import React, { useState } from 'react';

import { Row } from './Row';
import {
  MiddleColumn,
  NotesColumn,
  SerialColumn,
  Table,
  HeaderRow,
} from './Table';

export const Prescription = () => {
  const [size, setSize] = useState(2);

  return (
    <Table>
      <HeaderRow>
        <SerialColumn>No.</SerialColumn>
        <MiddleColumn>Medicine and Dosage</MiddleColumn>
        <NotesColumn>Notes</NotesColumn>
      </HeaderRow>
      {Array(size)
        .fill('')
        .map((_, i) => {
          const index = i + 1;
          const entered = ({
            target: { value },
          }: React.ChangeEvent<HTMLInputElement>) => {
            if (index === size) {
              setSize(size + 1);
            }
          };

          const removed = ({
            target: { value },
          }: React.ChangeEvent<HTMLInputElement>) => {
            if (index !== 1 && index === size - 1 && value.length === 0) {
              setSize(size - 1);
            }
          };

          return (
            <Row
              key={`row-key-${index}`}
              index={index}
              size={size}
              entered={entered}
              removed={removed}
            />
          );
        })}
    </Table>
  );
};
