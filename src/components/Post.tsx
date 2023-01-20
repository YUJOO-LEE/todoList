import styled from 'styled-components';
import Button from './Styled/Button';
import Input from './Styled/Input';

const Post = () => {
  return (
    <Styled.Post>
      <div className='inner'>
        <Styled.Form>
          <Input type='text' placeholder='Things to do' />
          <Input type='text' placeholder='Tag' />
          <Button className='add'>Add Todo</Button>
        </Styled.Form>
      </div>
    </Styled.Post>
  )
}

export default Post;

const Styled = {
  Post: styled.div`
    padding: 20px;
    font-size: 16px;
    background-color: #efefef;
  `,

  Form: styled.form`
    display: flex;
    justify-content: space-between;
    gap: 10px;

    input:first-of-type{
      flex: 1;
    }
  `,
}