import React, { ChangeEvent, Fragment, useState } from 'react';
import './App.css';

const labels: Array<string> = ['Name', 'Diagnosis', 'Procedure done', 'Care'];

const Label = ({ name }: { name: string }) => {
  return (
    <div>
      <label className='label'>
        {name}:
        <div contentEditable />
      </label>
    </div>
  );
};

export const App = () => {
  const [currentSize, setCurrentSize] = useState(2);

  const entered = (i: number) => {
    if (i === currentSize) {
      setCurrentSize(currentSize + 1);
    }
  };

  return (
    <div className='overall'>
      <div className='info'>
        {labels.map((name) => {
          return <Label name={name} key={name} />;
        })}
      </div>
      <div className='rx'>{'\u211E'}</div>
      <div className='prescription'>
        <table>
          <tbody>
            {Array(currentSize)
              .fill('')
              .map((_, i) => {
                const index = i + 1;
                return (
                  <Row
                    key={`key-${index}`}
                    index={index}
                    currentSize={currentSize}
                    entered={entered}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

type RowProps = {
  currentSize: number;
  index: number;
  entered: (i: number) => void;
};

const Row = ({ currentSize, index, entered }: RowProps) => {
  const [maybe, maybeLeft] =
    index === currentSize ? ['maybe', 'maybeLeft'] : ['', 'left'];

  const timeOfDay = ['Morning', 'Afternoon', 'Night'].map((time) => ({
    time,
    css: 'hidden',
  }));
  const [times, setTimes] = useState(timeOfDay);

  return (
    <Fragment key={`key-${index}`}>
      <tr className={maybe}>
        <td rowSpan={2} style={{ verticalAlign: 'top' }}>
          {index}
        </td>
        <td style={{ width: '50px' }}>
          <input
            style={{ width: '50px' }}
            type='text'
            placeholder='Type'
            className='tableInput'
            onChange={() => entered(index)}
          />
        </td>
        <td>
          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: 2, textAlign: 'left' }}>
              <input
                style={{ width: '100%' }}
                type='text'
                placeholder='Medicine Name &amp; Strength'
                className='tableInput'
                onChange={() => entered(index)}
              />
            </div>
            <div className={maybeLeft}>
              <input
                style={{ width: '100px' }}
                type='text'
                placeholder='Quantity'
                className='tableInput'
              />
            </div>
          </div>
        </td>
        <td
          rowSpan={2}
          style={{
            width: '100px',
            verticalAlign: 'top',
            textAlign: 'left',
            outline: 'none',
          }}
        >
          <div style={{ width: '100px' }} contentEditable data-ph='Remarks' />
        </td>
      </tr>
      <tr className={maybe}>
        <td></td>
        <td>
          <div className='schedule'>
            {times.map(({ time, css }, index) => {
              const handleChanged = ({
                target: { value },
              }: ChangeEvent<HTMLInputElement>) => {
                const timesCopy = [...times];
                timesCopy[index] = {
                  time,
                  css: value === '0' ? 'hidden' : '',
                };
                setTimes(timesCopy);
              };
              return (
                <div key={time} className={css}>
                  <div>
                    <input
                      type='number'
                      placeholder='0'
                      min={0}
                      max={99}
                      onChange={handleChanged}
                    />
                  </div>
                  {time}
                </div>
              );
            })}
          </div>
        </td>
      </tr>
    </Fragment>
  );
};
