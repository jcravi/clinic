import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  font-weight: bold;
  display: flex;
  align-items: flex-start;
  line-height: inherit;
`;

const TextArea = styled.textarea`
  vertical-align: top;
  width: 100%;
  height: 27px;
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
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const Label = ({ name, value, onChange }: LabelProps) => {
  const onTextAreaInput = ({
    currentTarget,
  }: React.FormEvent<HTMLTextAreaElement>) => {
    currentTarget.style.height = '27px';
    currentTarget.style.height = `${currentTarget.scrollHeight}px`;
  };
  return (
    <div>
      <StyledLabel>
        {name}:&nbsp;
        <TextArea
          name={name}
          onInput={onTextAreaInput}
          onChange={onChange}
          value={value}
        />
      </StyledLabel>
    </div>
  );
};
