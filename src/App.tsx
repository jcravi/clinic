import React, { Fragment, useState } from 'react';
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
          return <Label name={name} />;
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

  const times = [
    { time: 'Morning', className: '' },
    { time: 'Afternoon', className: maybeLeft },
    { time: 'Night', className: maybeLeft },
  ];
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
                placeholder='Name &amp; Strength'
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
            {times.map(({ time, className }) => {
              return (
                <div className={className}>
                  <div>
                    <input type='number' min={0} max={99} />
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
