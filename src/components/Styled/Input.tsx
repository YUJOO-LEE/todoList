import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Input = (props : InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Styled.Input {...props} />
  )
}

export default Input;

const Styled = {
  Input: styled.input`
    padding: 11px;
    border-radius: 5px;
    border: 2px solid transparent;
    background-color: #fff;
    font-size: 16px;

    &.edit{
      flex: 1;
      border: 1px solid #ddd;
    }

    &.error{
      border-color: red;
      &::placeholder{
        color: red;
      }
    }
  `,
}