import styled from 'styled-components';
import Button from './Styled/Button';
import Checkbox from './Styled/CheckBox';
import Tages from './Tags';

const Item = () => {
  return (
    <Styled.Wrap>
      <Styled.Item>
        <Checkbox type='checkbox' />
        <span>
          Item
        </span>
        <Button className='edit'>Edit</Button>
        <Button className='delete'>Delete</Button>
      </Styled.Item>
      <Tages />
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