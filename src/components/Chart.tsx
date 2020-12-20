import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const HEIGHT = 250;
const WIDTH = 350;

const offset: number = 20;

const Y_AXIS = [
  '-10',
  '0',
  '10',
  '20',
  '30',
  '40',
  '50',
  '60',
  '70',
  '80',
  '90',
];

const X_AXIS = ['125', '250', '500', '100', '2000', '4000', '8000'];

const xInc = (WIDTH - 2 * offset) / X_AXIS.length;
const yInc = (HEIGHT - 2 * offset) / Y_AXIS.length;

type StateType = {
  [key: string]: number;
};

const initialState: StateType = X_AXIS.reduce(
  (o, key) => ({ ...o, [key]: -1 }),
  {}
);

const SVG = styled.svg`
  height: ${HEIGHT}px;
  width: ${WIDTH}px;
`;

const Axis = styled.g`
  & > line {
    stroke: black;
  }
`;

const AxisLabels = styled.g`
  font-size: 12px;
`;

const Right = styled.g`
  & > circle {
    fill: none;
    stroke: red;
  }
  & > polyline {
    stroke: red;
  }
`;

const Left = styled.g`
  & > text {
    fill: blue;
  }
  & > polyline {
    stroke: blue;
  }
`;

const NumberInput = styled.input.attrs((_) => ({
  type: 'number',
  placeholder: '0',
  min: -10,
  max: 120,
  step: 5,
}))`
  width: 55px;
  border: none;
  text-align: center;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    opacity: 1;
  }
`;

const calcX = (index: number): number => {
  return offset + (index + 1) * xInc;
};

const calcY = (value: number): number => {
  return HEIGHT - offset - ((value / 5) * yInc) / 2;
};

const subAxisStyle = {
  strokeWidth: '1px',
  stroke: 'lightgrey',
  strokeDasharray: '1',
};

export const Chart = () => {
  const [right, setRight] = useState(initialState);
  const [rightPoints, setRightPoints] = useState('');
  const setRightValue = (key: string, valueStr: string) => {
    const value = +valueStr;
    setRight({ ...right, [key]: value });
  };
  useEffect(() => {
    const points = X_AXIS.reduce((s, v, i) => {
      if (right[v] !== -1) {
        const cx = calcX(i);
        const cy = calcY(right[v]);
        return s + ' ' + cx + ',' + cy;
      } else {
        return s;
      }
    }, '');

    setRightPoints(points);
  }, [right]);

  const [left, setLeft] = useState(initialState);
  const [leftPoints, setLeftPoints] = useState('');
  const setLeftValue = (key: string, valueStr: string) => {
    const value = +valueStr;
    setLeft({ ...left, [key]: value });
  };
  useEffect(() => {
    const points = X_AXIS.reduce((s, v, i) => {
      if (left[v] !== -1) {
        const cx = calcX(i);
        const cy = calcY(left[v]);
        return s + ' ' + cx + ',' + cy;
      } else {
        return s;
      }
    }, '');

    setLeftPoints(points);
  }, [left]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', borderBottom: '1px solid lightgrey' }}>
          <div
            style={{
              float: 'left',
              width: '50px',
              textAlign: 'right',
              borderRight: '1px solid lightgrey',
              paddingRight: '5px',
            }}
          >
            Freq
          </div>
          <div style={{ width: '55px', textAlign: 'center' }}>Right</div>
          <div style={{ width: '55px', textAlign: 'center' }}>Left</div>
        </div>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              width: '50px',
              borderRight: '1px solid lightgrey',
              paddingRight: '5px',
            }}
          >
            {X_AXIS.map((x) => {
              return (
                <div
                  key={x}
                  style={{
                    height: '27px',
                    textAlign: 'right',
                  }}
                >
                  {x}
                </div>
              );
            })}
          </div>
          <div>
            {X_AXIS.map((x) => {
              return (
                <div key={x}>
                  <NumberInput
                    onChange={({ target: { value } }) =>
                      setRightValue(x, value)
                    }
                  />
                </div>
              );
            })}
          </div>
          <div>
            {X_AXIS.map((x) => {
              return (
                <div key={x}>
                  <NumberInput
                    onChange={({ target: { value } }) => setLeftValue(x, value)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <SVG version='1.2' role='img'>
          <Axis>
            {X_AXIS.map((key, index) => {
              const x = offset + (index + 1) * xInc;
              return (
                <line
                  key={key}
                  style={subAxisStyle}
                  x1={x}
                  y1={offset}
                  x2={x}
                  y2={HEIGHT - offset}
                />
              );
            })}
            {Y_AXIS.map((key, index) => {
              const y = HEIGHT - offset - (index + 1) * yInc;
              return (
                <line
                  key={key}
                  style={subAxisStyle}
                  x1={offset}
                  y1={y}
                  x2={WIDTH - offset}
                  y2={y}
                />
              );
            })}

            <line x1={offset} y1={offset} x2={offset} y2={HEIGHT - offset} />
            <line
              x1={offset}
              y1={HEIGHT - offset}
              x2={WIDTH - offset}
              y2={HEIGHT - offset}
            />
          </Axis>
          <AxisLabels>
            <text
              x={offset - 2}
              y={HEIGHT / 2}
              transform={`rotate(-90, ${offset - 2}, ${
                HEIGHT / 2
              }) translate(-60, -2)`}
            >
              Hearing Level (db HL)
            </text>
            <text x={WIDTH / 2 - 40} y={HEIGHT - offset + 15}>
              Frequency
            </text>
          </AxisLabels>
          <Right>
            {X_AXIS.map((x, index) => {
              const cx = calcX(index);
              const cy = calcY(right[x]);
              return right[x] === -1 ? null : (
                <circle key={x} cx={cx} cy={cy} r='3' />
              );
            })}
            <polyline fill='none' points={rightPoints} />
          </Right>
          <Left>
            {X_AXIS.map((x, index) => {
              const cx = calcX(index) - 4;
              const cy = calcY(left[x]) + 4;
              return left[x] === -1 ? null : (
                <text key={x} x={cx} y={cy}>
                  x
                </text>
              );
            })}
            <polyline fill='none' points={leftPoints} />
          </Left>
        </SVG>
      </div>
    </div>
  );
};
