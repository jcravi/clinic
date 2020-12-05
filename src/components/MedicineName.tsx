import React, { useState } from 'react';
import styled from 'styled-components';

import { search, SearchResult } from '../js/search';
import { Input } from './Input';

const AutoCompleteContainer = styled.div`
  position: relative;
  flex-grow: 2;
  text-align: left;
`;

const AutoCompleteItems = styled.div`
  position: absolute;
  border: 1px solid lightgray;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
  box-shadow: 0px 3px 10px gray;
  width: 130%;
  @media print {
    display: none;
  }
`;

const AutoCompleteItem = styled.div<{ highlighted: boolean; hover: boolean }>`
  padding: 3px;
  cursor: pointer;
  background-color: ${({ highlighted }) =>
    highlighted ? 'lightgray' : 'whitesmoke'};
  border-bottom: 1px solid gray;
  &:hover {
    background-color: ${({ highlighted, hover }) =>
      hover ? 'lightgray' : highlighted ? 'lightgray' : 'whitesmoke'};
  }
`;

type Props = {
  entered: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removed: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const MedicineName = ({ entered, removed }: Props) => {
  const [name, setName] = useState('');
  const [choices, setChoices] = useState<Array<SearchResult>>([]);
  const [selected, setSelected] = useState<number>(-1);
  const [hover, setHover] = useState(true);

  const reset = () => {
    setChoices([]);
    setSelected(-1);
  };

  const onKeyUp = ({ key }: React.KeyboardEvent<HTMLInputElement>): void => {
    if (key === 'ArrowUp') {
      const newSelected = selected <= 0 ? choices.length - 1 : selected - 1;
      setSelected(newSelected);
      setHover(false);
    } else if (key === 'ArrowDown') {
      const newSelected = selected >= choices.length - 1 ? 0 : selected + 1;
      setSelected(newSelected);
      setHover(false);
    } else if (key === 'Enter') {
      if (selected >= 0) {
        setInput(choices[selected]);
        reset();
      }
    } else if (/[a-z0-9]/i.test(key) || key === 'Backspace') {
      if (name.length > 0) {
        const names = search(name).slice(0, 10);
        setChoices(names);
      } else {
        reset();
      }
    } else {
      console.log('SOMETHING ELSE', `"${key}"`);
    }
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    removed(event);
    reset();
  };

  const onMouseMove = () => {
    setSelected(-1);
    setHover(true);
  };

  const setInput = (medicine: SearchResult) => {
    setName(`${medicine.type} ${medicine.name}`);
  };

  return (
    <AutoCompleteContainer>
      <Input
        style={{ width: '100%' }}
        type='text'
        autoComplete='off'
        placeholder='Medicine Name, Type &amp; Strength'
        onChange={(event) => {
          entered(event);
          setName(event.target.value);
        }}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        value={name}
      />
      {choices.length !== 0 && (
        <AutoCompleteItems>
          {choices.map((choice, index) => {
            const onMouseDown = () => {
              setInput(choice);
              reset();
            };
            return (
              <AutoCompleteItem
                key={`${choice.name}-${choice.type}-${choice.form}-${index}`}
                highlighted={index === selected}
                hover={hover}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
              >
                {choice.type} {choice.form} {choice.name} {choice.generic}{' '}
                {choice.score}
              </AutoCompleteItem>
            );
          })}
        </AutoCompleteItems>
      )}
    </AutoCompleteContainer>
  );
};
