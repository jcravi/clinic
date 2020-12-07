import styled from 'styled-components';

export const Table = styled.div`
  width: 100%;
  border: none;
  & div {
    border: none;
    text-align: center;
  }
  @media print {
    border: none;
    & div {
      border: none;
      caret-color: transparent;
    }
  }
`;

const Column = styled.div`
  vertical-align: top;
  border-width: 1px !important;
  @media print {
    border: none !important;
  }
`;

export const SerialColumn = styled(Column)`
  width: 25px;
  vertical-align: top;
  text-align: center;
  border-left: 1px solid gray;
  border-right: none !important;
`;

export const MiddleColumn = styled(Column)`
  flex-grow: 1;
  color: black;
  text-align: center;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
`;

export const NotesColumn = styled(Column)`
  width: 100px;
  text-align: left;
  border-right: 1px solid gray;
  border-left: none !important;
`;

export const TableRow = styled.div`
  display: flex;
  width: 100%;
  & > div {
    border-top: none !important;
    border-bottom: none !important;
  }
`;

export const HeaderRow = styled(TableRow)`
  font-weight: bold;
`;
