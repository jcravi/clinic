import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Chart } from './Chart';
import { X_AXIS } from '../../utils/chart-utils';
import { Label } from '../common/Label';

import { setPoint, setAudiogramInput } from '../../actions/index';
import {
  AudiogramTextType,
  ChartType,
  PointsType,
  StateInterface,
} from '../../interfaces/index';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  @media print {
    justify-content: center;
  }
`;

const ChartContainer = styled.div`
  @media print {
    padding-top: 20px;
    padding-bottom: 40px;

    & > svg {
      transform: scale(1.25);
    }
  }
`;

const Entry = styled.div`
  @media print {
    display: none;
  }
`;

const Cell = styled.div`
  width: 60px;
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

const NumberInput = styled.input.attrs((_) => ({
  type: 'number',
  placeholder: '0',
  min: -20,
  max: 99,
  step: 5,
}))`
  font-size: 17px;
  line-height: inherit;
  width: 100%;
  border: none;
  text-align: center;
  position: relative;
  z-index: 1;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    opacity: 1;
  }
  &:focus {
    z-index: 2;
  }
`;

interface NumbersType {
  points: PointsType;
  sideType: keyof ChartType;
}

const AudiogramComponent = ({
  rightAir,
  rightBone,
  leftAir,
  leftBone,
  remarks,
  hearingAidTrial,
  setPoint,
  setAudiogramInput,
}: ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps) => {
  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAudiogramInput(name as keyof AudiogramTextType, value);
  };

  const arr: Array<NumbersType> = [
    { points: rightAir, sideType: 'rightAir' },
    { points: rightBone, sideType: 'rightBone' },
    { points: leftAir, sideType: 'leftAir' },
    { points: leftBone, sideType: 'leftBone' },
  ];
  return (
    <>
      <Container>
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
              <div style={{ width: '120px', textAlign: 'center' }}>Right</div>
              <div style={{ display: 'flex' }}>
                <Cell>Air</Cell>
                <Cell>Bone</Cell>
              </div>
            </div>
            <div>
              <div style={{ width: '120px', textAlign: 'center' }}>Left</div>
              <div style={{ display: 'flex' }}>
                <Cell>Air</Cell>
                <Cell>Bone</Cell>
              </div>
            </div>
          </div>
          {/* Body/Content */}
          <div style={{ display: 'flex' }}>
            <Cell
              style={{
                borderRight: '1px solid lightgrey',
                paddingRight: '5px',
              }}
            >
              {X_AXIS.map((x) => (
                <div key={x} style={{ height: '27px', textAlign: 'right' }}>
                  {x}
                </div>
              ))}
            </Cell>
            {arr.map((o, i) => {
              const onChange = ({
                target: { name, value },
              }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setPoint(o.sideType, name as keyof PointsType, value);
              };
              return (
                <div key={`div-${o}-${i}`}>
                  {X_AXIS.map((x) => (
                    <Cell key={`cell-${o}-${i}-${x}`}>
                      <NumberInput
                        onChange={onChange}
                        name={x}
                        value={o.points[x]}
                      />
                    </Cell>
                  ))}
                </div>
              );
            })}
          </div>
        </Entry>
        <ChartContainer>
          <Chart />
        </ChartContainer>
      </Container>
      <div>
        <Label
          inputName='remarks'
          name='Remarks'
          onChange={onChange}
          value={remarks}
        />
        <Label
          inputName='hearingAidTrial'
          name={'Hearing\u202fAid\u202fTrial'}
          onChange={onChange}
          value={hearingAidTrial}
        />
      </div>
    </>
  );
};

const mapStateToProps = ({
  chart: { rightAir, rightBone, leftAir, leftBone },
  audiogram: { remarks, hearingAidTrial },
}: StateInterface) => ({
  rightAir,
  rightBone,
  leftAir,
  leftBone,
  remarks,
  hearingAidTrial,
});

const mapDispatchToProps = {
  setPoint,
  setAudiogramInput,
};

export const Audiogram = connect(
  mapStateToProps,
  mapDispatchToProps
)(AudiogramComponent);
