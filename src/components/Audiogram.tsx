import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Chart } from './Chart';
import { X_AXIS, calcX, calcY } from '../js/chart-utils';

type StateType = {
  [key: string]: number;
};

const initialState: StateType = X_AXIS.reduce(
  (o, key) => ({ ...o, [key]: -1 }),
  {}
);

const Entry = styled.div`
  @media print {
    visibility: hidden;
  }
`;

const Cell = styled.div`
  width: 55px;
  text-align: center;
  & > input[type='number'] {
    width: 55px;
    border: none;
    text-align: center;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      opacity: 1;
    }
  }
`;

const setPointLine = (
  state: StateType,
  setState: (value: React.SetStateAction<string>) => void
): void => {
  const points = X_AXIS.reduce((acc, curr, index) => {
    if (state[curr] >= 0) {
      const cx = calcX(index);
      const cy = calcY(state[curr]);
      return acc + ' ' + cx + ',' + cy;
    } else {
      return acc;
    }
  }, '');
  setState(points);
};

const setPoint = (
  key: string,
  value: string,
  state: StateType,
  setState: (value: React.SetStateAction<StateType>) => void
): void => {
  setState({ ...state, [key]: +value });
};

export const Audiogram = () => {
  const [rightAirPoints, setRightAirPoints] = useState(initialState);
  const [rightAirPointLine, setRightAirPointLine] = useState('');
  useEffect(() => setPointLine(rightAirPoints, setRightAirPointLine), [
    rightAirPoints,
  ]);

  const [rightBonePoints, setRightBonePoints] = useState(initialState);
  const [rightBonePointLine, setRightBonePointLine] = useState('');
  useEffect(() => setPointLine(rightBonePoints, setRightBonePointLine), [
    rightBonePoints,
  ]);

  const [leftAirPoints, setLeftAirPoints] = useState(initialState);
  const [leftPointLine, setLeftPointLine] = useState('');
  useEffect(() => setPointLine(leftAirPoints, setLeftPointLine), [
    leftAirPoints,
  ]);

  const [leftBonePoints, setLeftBonePoints] = useState(initialState);
  const [leftBonePointLine, setLeftBonePointLine] = useState('');
  useEffect(() => setPointLine(leftBonePoints, setLeftBonePointLine), [
    leftBonePoints,
  ]);

  const ChartProps = {
    right: {
      air: {
        points: rightAirPoints,
        pointLine: rightAirPointLine,
      },
      bone: {
        points: rightBonePoints,
        pointLine: rightBonePointLine,
      },
    },
    left: {
      air: {
        points: leftAirPoints,
        pointLine: leftPointLine,
      },
      bone: {
        points: leftBonePoints,
        pointLine: leftBonePointLine,
      },
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '20px',
      }}
    >
      <Entry>
        {/* Header */}
        <div style={{ display: 'flex', borderBottom: '1px solid lightgrey' }}>
          <Cell
            style={{
              textAlign: 'right',
              borderRight: '1px solid lightgrey',
              paddingRight: '5px',
              lineHeight: '50px',
            }}
          >
            Freq
          </Cell>
          <div>
            <div style={{ width: '110px', textAlign: 'center' }}>Right</div>
            <div style={{ display: 'flex' }}>
              <Cell>Air</Cell>
              <Cell>Bone</Cell>
            </div>
          </div>
          <div>
            <div style={{ width: '110px', textAlign: 'center' }}>Left</div>
            <div style={{ display: 'flex' }}>
              <Cell>Air</Cell>
              <Cell>Bone</Cell>
            </div>
          </div>
        </div>
        {/* Body/Content */}
        <div style={{ display: 'flex' }}>
          <Cell
            style={{ borderRight: '1px solid lightgrey', paddingRight: '5px' }}
          >
            {X_AXIS.map((x) => (
              <div key={x} style={{ height: '27px', textAlign: 'right' }}>
                {x}
              </div>
            ))}
          </Cell>
          {[
            { state: rightAirPoints, setState: setRightAirPoints },
            { state: rightBonePoints, setState: setRightBonePoints },
            { state: leftAirPoints, setState: setLeftAirPoints },
            { state: leftBonePoints, setState: setLeftBonePoints },
          ].map((o, i) => (
            <div key={`div-${o}-${i}`}>
              {X_AXIS.map((x) => (
                <Cell key={`cell-${o}-${i}-${x}`}>
                  <input
                    type='number'
                    placeholder='0'
                    min='0'
                    max='120'
                    step='5'
                    onChange={({ target: { value } }) =>
                      setPoint(x, value, o.state, o.setState)
                    }
                  />
                </Cell>
              ))}
            </div>
          ))}
        </div>
      </Entry>
      <div>
        <Chart {...ChartProps} />
      </div>
    </div>
  );
};
