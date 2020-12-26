import React, { useEffect, useRef } from 'react';
import { StyledLabel, TextArea } from './CommonComponents';

type LabelProps = {
  name: string;
  inputName?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const Label = ({ inputName, name, value, onChange }: LabelProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onTextAreaInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(event);
    const { currentTarget } = event;
    currentTarget.style.height = '27px';
    currentTarget.style.height = `${currentTarget.scrollHeight}px`;
  };

  useEffect(() => {
    if (value === '' && textAreaRef.current) {
      textAreaRef.current.style.height = '27px';
    }
  }, [value]);

  return (
    <div>
      <StyledLabel>
        {name}:&nbsp;
        <TextArea
          ref={textAreaRef}
          name={inputName || name}
          onChange={onTextAreaInput}
          value={value}
        />
      </StyledLabel>
    </div>
  );
};
