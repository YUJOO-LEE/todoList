import styled from 'styled-components';

const NoTaskMsg = () => {
  return (
    <Styled.Wrapper>
      <Styled.Icon>&#x1F60D;</Styled.Icon>
      <div>
        <Styled.Welcome>Welcome!</Styled.Welcome>
        <Styled.Message>please add a task!</Styled.Message>
      </div>
    </Styled.Wrapper>
  )
}

export default NoTaskMsg;

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 100px;
  `,
  Icon: styled.div`
    font-size: 50px;
  `,
  Welcome: styled.p`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  `,
  Message: styled.p`
    font-size: 20px;
  `,
}