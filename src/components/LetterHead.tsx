import React from 'react';
import styled from 'styled-components';

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
  font-size: 30px;
  font-weight: bold;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Address = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: bold;

  margin-top: 5px;

  padding-top: 2px;
  padding-bottom: 2px;

  border-top: 2px solid black;
  border-bottom: 2px solid black;
`;

export const LetterHead = ({
  printLetterHead,
}: {
  printLetterHead: boolean;
}) => {
  return (
    <Container printLetterHead={printLetterHead}>
      <Title>JK Holistic Ear nose Throat &amp; Head-Neck Clinic</Title>
      <Content>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Dr. Janardhan N. C.
          </div>
          <div>MBBS, MS(ENT), DORL, PGDHHCM</div>
          <div>Reg. No: 45341</div>
        </div>
        <div>
          <div>Mon/Wed/Thur/Sat</div>
          <div>10 am to 1 pm</div>
          <div>5 pm to 8 pm</div>
        </div>
      </Content>
      <Address>
        45,46 Panvel City Centre, Ground Floor, Dr. B. Ambedkar Road,
        Panvel-410206. Tel: 022-27456244 Mob: 9324796638
      </Address>
    </Container>
  );
};
