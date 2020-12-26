import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ChartType, StateInterface } from '../../interfaces';

import {
  X_AXIS,
  Y_AXIS,
  width,
  height,
  offset,
  xInc,
  yInc,
  calcX,
  calcY,
  DEFAULT,
  toPointsLine,
} from '../../utils/chart-utils';

const Legend = styled.g`
  font-size: 10px;
  & > text {
  }
`;

const Axis = styled.g`
  & > line {
    stroke: black;
  }
`;

const AxisTitle = styled.g`
  font-size: 12px;
`;

const AxisLabel = styled.g`
  font-size: 14px;
`;

const RightAir = styled.g`
  & > circle {
    fill: white;
    stroke: red;
  }
  & > polyline {
    stroke: red;
    fill: none;
  }
`;

const RightBone = styled(RightAir)`
  & > polyline {
    stroke-dasharray: 5;
  }
`;

const LeftAir = styled.g`
  font: bold 15px arial;
  & > text {
    fill: blue;
  }
  & > polyline {
    stroke: blue;
  }
`;

const LeftBone = styled(LeftAir)`
  & > polyline {
    stroke-dasharray: 5;
  }
`;

const subAxisStyle = {
  strokeWidth: '1px',
  stroke: 'darkgrey',
  strokeDasharray: '1',
  fill: 'none',
};

const subSubAxisStyle = {
  ...subAxisStyle,
  stroke: 'lightgrey',
};

const ChartComponent = ({
  rightAir,
  rightBone,
  leftAir,
  leftBone,
}: ChartType) => {
  return (
    <svg
      version='1.2'
      role='img'
      style={{
        height: `${height}`,
        width: `${width}`,
      }}
    >
      <Legend transform='translate(50,5)'>
        <text x='0' y='10'>
          Right Air
        </text>
        <line x1='60' y1='7' x2='110' y2='7' stroke='red' fill='none' />
        <circle cx='85' cy='7' r='3' stroke='red' fill='white' />
        <text x='0' y='25'>
          Right Bone
        </text>
        <line
          x1='60'
          y1='22'
          x2='110'
          y2='22'
          stroke='red'
          strokeDasharray='4'
          fill='none'
        />
        <circle cx='85' cy='22' r='3' stroke='red' fill='white' />
        <text x='150' y='10'>
          Left Air
        </text>
        <line x1='210' y1='7' x2='260' y2='7' stroke='blue' fill='none' />
        <text
          x='235'
          y='10.5'
          style={{ font: 'bold 15px arial', color: 'blue' }}
          fill='blue'
          textAnchor='middle'
        >
          x
        </text>
        <text x='150' y='25'>
          Left Bone
        </text>
        <line
          x1='210'
          y1='22'
          x2='260'
          y2='22'
          stroke='blue'
          strokeDasharray='4'
          fill='none'
        />
        <text
          x='235'
          y='25.5'
          style={{ font: 'bold 15px arial', color: 'blue' }}
          fill='blue'
          textAnchor='middle'
        >
          x
        </text>
      </Legend>
      <Axis>
        {/* Y Axis Helpers */}
        {X_AXIS.map((key, index) => {
          const x = offset + (index + 1) * xInc;
          return (
            <line
              key={key}
              style={subAxisStyle}
              x1={x}
              y1={offset}
              x2={x}
              y2={height - offset}
            />
          );
        })}
        {X_AXIS.map((key, index) => {
          const x = offset + (index + 1) * xInc - xInc / 2;
          return (
            <line
              key={key}
              style={subSubAxisStyle}
              x1={x}
              y1={offset}
              x2={x}
              y2={height - offset}
            />
          );
        })}
        {/* X Axis Helpers */}
        {Y_AXIS.map((key, index) => {
          const y = height - offset - (index + 1) * yInc;
          return index !== Y_AXIS.length - 1 ? (
            <line
              key={key}
              style={subAxisStyle}
              x1={offset}
              y1={y}
              x2={width - offset}
              y2={y}
            />
          ) : null;
        })}
        {Y_AXIS.map((key, index) => {
          const y = height - offset - (index + 1) * yInc + yInc / 2;
          return index !== Y_AXIS.length - 1 ? (
            <line
              key={key}
              style={subSubAxisStyle}
              x1={offset}
              y1={y}
              x2={width - offset}
              y2={y}
            />
          ) : null;
        })}
        {/* X Axis */}
        <line
          x1={offset}
          y1={height - offset}
          x2={width - offset}
          y2={height - offset}
        />
        {/* Y Axis */}
        <line x1={offset} y1={offset} x2={offset} y2={height - offset} />
      </Axis>
      <AxisLabel>
        {X_AXIS.map((key, index) => {
          const x = offset + (index + 1) * xInc;
          return (
            <text key={key} x={x} y={height - offset + 13} textAnchor='middle'>
              {key}
            </text>
          );
        })}
        {Y_AXIS.map((key, index) => {
          const y = height - offset - index * yInc + 4;
          return (
            <text key={key} x={offset - 4} y={y} textAnchor='end'>
              {key}
            </text>
          );
        })}
      </AxisLabel>
      <AxisTitle>
        <text
          x={offset - 25}
          y={height / 2}
          textAnchor='middle'
          transform={`rotate(-90, ${offset - 25}, ${height / 2})`}
        >
          Intensity (db)
        </text>
        <text x={width / 2} y={height - offset + 30} textAnchor='middle'>
          Frequency (Hz)
        </text>
      </AxisTitle>
      <RightAir>
        <polyline points={toPointsLine(rightAir)} />
        {X_AXIS.map((x, index) => {
          const cx = calcX(index);
          const cy = calcY(rightAir[x]);
          return rightAir[x] === DEFAULT ? null : (
            <circle key={x} cx={cx} cy={cy} r='3' />
          );
        })}
      </RightAir>
      <RightBone>
        <polyline points={toPointsLine(rightBone)} />
        {X_AXIS.map((x, index) => {
          const cx = calcX(index);
          const cy = calcY(rightBone[x]);
          return rightBone[x] === DEFAULT ? null : (
            <circle key={x} cx={cx} cy={cy} r='3' />
          );
        })}
      </RightBone>
      <LeftAir>
        {X_AXIS.map((x, index) => {
          const cx = calcX(index);
          const cy = calcY(leftAir[x]) + 4.5;
          return leftAir[x] === DEFAULT ? null : (
            <text key={x} x={cx} y={cy} textAnchor='middle'>
              x
            </text>
          );
        })}
        <polyline fill='none' points={toPointsLine(leftAir)} />
      </LeftAir>
      <LeftBone>
        {X_AXIS.map((x, index) => {
          const cx = calcX(index);
          const cy = calcY(leftBone[x]) + 4.5;
          return leftBone[x] === DEFAULT ? null : (
            <text key={x} x={cx} y={cy} textAnchor='middle'>
              x
            </text>
          );
        })}
        <polyline fill='none' points={toPointsLine(leftBone)} />
      </LeftBone>
    </svg>
  );
};

const mapStateToProps = ({
  chart: { rightAir, rightBone, leftAir, leftBone },
}: StateInterface) => ({
  rightAir,
  rightBone,
  leftAir,
  leftBone,
});

export const Chart = connect(mapStateToProps)(ChartComponent);
