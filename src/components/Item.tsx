import styled from 'styled-components';
import { Todo } from '../mocks/types/todo';
import Button from './Styled/Button';
import Checkbox from './Styled/CheckBox';
import Tages from './Tags';

const Item = ({title, tags}: Todo) => {
  return (
    <Styled.Wrap>
      <Styled.Item>
        <Checkbox type='checkbox' />
        <span>
          {title}
        </span>
        <Button className='edit'>Edit</Button>
        <Button className='delete'>Delete</Button>
      </Styled.Item>
      <Tages tags={tags} />
    </Styled.Wrap>
  )
}

export default Item;

const Styled = {
  Wrap: styled.li`
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #efefef;
  `,
  Item: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    span{
      flex: 1;
    }
  `,
}