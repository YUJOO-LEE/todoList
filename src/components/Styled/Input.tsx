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
    padding: 10px;
    border-radius: 5px;
    border: 2px solid transparent;
    background-color: #fff;
    font-size: 16px;

    &.error{
      border: 2px solid red;
      &::placeholder{
        color: red;
      }
    }
  `,
}