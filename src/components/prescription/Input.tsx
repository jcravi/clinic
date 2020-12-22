import styled from 'styled-components';

export const Input = styled.input`
  border: none;
  padding-top: 0px;
  padding-bottom: 0px;
  @media print {
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: transparent;
    }
  }
`;
