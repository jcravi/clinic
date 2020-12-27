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
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = '27px';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div>
      <StyledLabel>
        {name}:&nbsp;
        <TextArea
          ref={ref}
          name={inputName || name}
          onChange={onChange}
          value={value}
        />
      </StyledLabel>
    </div>
  );
};
