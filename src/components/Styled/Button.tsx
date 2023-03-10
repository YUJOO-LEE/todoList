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


    &.gray{
      background-color: #efefef;
    }

    &.yellow{
      background-color: #ffcc00;
    }

    &.add{
      height: 44px;
      padding: 10px;
      font-size: 16px;
      line-height: 24px;
    }

    &.filter{
      padding: 5px 0;
      &.selected{
        background-color: #fb9691;
        padding: 5px 10px;
      }
    }

    &.viewMore{
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      font-size: 16px;
    }
  `,
}