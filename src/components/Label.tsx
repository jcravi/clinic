import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  font-weight: bold;
  display: flex;
  align-items: flex-start;
`;

const TextArea = styled.textarea`
  vertical-align: top;
  width: 100%;
  height: 26px;
  border: none;
  border-bottom: 1px dotted gray;
  overflow: hidden;
  padding-top: 0px;
  resize: vertical;
  &::-webkit-resizer {
    display: none;
  }
  &:focus {
    outline: transparent;
    border-bottom: 1px solid gray;
  }
  @media print {
    border: none;
    &:focus {
      outline: none;
      border: none;
    }
    &::placeholder {
      color: transparent;
    }
  }
`;

type LabelProps = {
  name: string;
};

export const Label = ({ name }: LabelProps) => {
  const onTextAreaInput = ({
    currentTarget,
  }: React.FormEvent<HTMLTextAreaElement>) => {
    currentTarget.style.height = '26px';
    currentTarget.style.height = `${currentTarget.scrollHeight}px`;
  };
  return (
    <div>
      <StyledLabel>
        {name}:&nbsp;
        <TextArea onInput={onTextAreaInput} autoFocus={name === 'Name'} />
      </StyledLabel>
    </div>
  );
};
