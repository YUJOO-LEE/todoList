import styled from 'styled-components';

const Header = () => {
  return (
    <Styled.Header>
      <div className='inner'>
        <Styled.Title>
          <i className='emoji'>&#x270F;</i>
          Let's To-Do!
        </Styled.Title>
      </div>
    </Styled.Header>
  )
}

export default Header;

const Styled = {
  Header: styled.header`
    padding: 20px;
  `,

  Title: styled.h1`
    font-size: 24px;
    i{
      margin-right: 10px;
    }
  `,
}