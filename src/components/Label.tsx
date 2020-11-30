import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  font-weight: bold;
  display: flex;
  align-items: flex-start;
`;

const EditableDiv = styled.div`
  flex: 1;
  border-bottom: 1px dotted gray;
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  &:focus {
    font-weight: normal;
    outline: transparent;
    border-bottom: 1px solid gray;
  }
  @media print {
    &:focus {
      border: none;
      caret-color: transparent;
    }
    border: none;
    caret-color: transparent;
  }
`;

type LabelProps = {
  name: string;
};

export const Label = ({ name }: LabelProps) => {
  return (
    <div>
      <StyledLabel>
        {name}:&nbsp;
        <EditableDiv contentEditable />
      </StyledLabel>
    </div>
  );
};
