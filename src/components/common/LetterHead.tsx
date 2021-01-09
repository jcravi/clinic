import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { RootStateType } from '../../slices';

const Container = styled.div<{ printLetterHead: boolean }>`
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 10px;
  display: block;
  @media print {
    display: ${({ printLetterHead }) => (printLetterHead ? 'block' : 'none')};
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 25px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Address = styled.div`
  text-align: center;
  font-size: 13px;

  margin-top: 5px;

  padding-top: 2px;
  padding-bottom: 2px;

  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const LetterHeadComponent = ({
  name,
  degrees,
  reg,
  days,
  times1,
  times2,
  print,
}: ReturnType<typeof mapState>) => {
  return (
    <Container printLetterHead={print}>
      <Title>JK Holistic Ear Nose Throat &amp; Head-Neck Clinic</Title>
      <Content>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{name}</div>
          <div>{degrees}</div>
          <div>Reg. No: {reg}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div>{days}</div>
          <div>{times1}</div>
          <div>{times2}</div>
        </div>
      </Content>
      <Address>
        45,46 Panvel City Centre, Ground Floor, Dr. B. Ambedkar Road,
        Panvel-410206. Tel: 022-27456244 Mob: 9324796638
      </Address>
    </Container>
  );
};

const mapState = ({
  letterHead: { name, degrees, reg, days, times1, times2, print },
}: RootStateType) => ({
  name,
  degrees,
  reg,
  days,
  times1,
  times2,
  print,
});

export const LetterHead = connect(mapState)(LetterHeadComponent);
