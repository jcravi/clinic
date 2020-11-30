import React, { useState } from 'react';
import styled from 'styled-components';
import { Row } from './Row';

const StyledTable = styled.table`
  width: 100%;
  & th {
    text-align: center;
  }
  @media print {
    & td {
      border: none;
      caret-color: transparent;
    }
  }
`;

export const Prescription = () => {
  const [size, setSize] = useState(2);

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>No.</th>
          <th>Medicine and Dosage</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
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
      </tbody>
    </StyledTable>
  );
};
