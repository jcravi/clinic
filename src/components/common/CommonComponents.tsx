import styled from 'styled-components';

export const StyledLabel = styled.label`
  font-weight: bold;
  display: flex;
  align-items: flex-start;
`;

export const TextArea = styled.textarea`
  vertical-align: top;
  width: 100%;
  height: 27px;
  border: none;
  border-bottom: 1px dotted gray;
  overflow: hidden;
  padding-top: 0px;
  resize: vertical;
  &::-webkit-resizer {
    display: none;
  }
  &:focus {
    outline: transparent;
    border-bottom: 1px solid gray;
  }
  @media print {
    border: none;
    &:focus {
      outline: none;
      border: none;
    }
    &::placeholder {
      color: transparent;
    }
  }
`;
