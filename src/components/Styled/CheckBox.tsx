import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Checkbox = (props : InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Styled.Checkbox {...props} />
  )
}

export default Checkbox;

const Styled = {
  Checkbox: styled.input`
    appearance: none;
    border: 1px solid #ddd;
    background-color: #f6f6f6;
    border-radius: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;

    &:checked{
      border-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
      background-color: #fb9691;
    }
  `,
}