import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';

const Button = ({ children, ...props }
  : ButtonHTMLAttributes<HTMLButtonElement> | PropsWithChildren
  ) => {
  return (
    <Styled.Button {...props}>{children}</Styled.Button>
  )
}

export default Button;

const Styled = {
  Button: styled.button`
    font-size: 14px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: transparent;
    cursor: pointer;

    &.add{
      padding: 10px;
      background-color: #ffcc00;
      font-size: 16px;
    }

    &.filter{
      padding: 5px 0;
      &.selected{
        background-color: #fb9691;
        padding: 5px 10px;
      }
    }

    &.edit{
      background-color: #efefef;
    }

    &.delete{
      background-color: #efefef;
    }
  `,
}