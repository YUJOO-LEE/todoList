import { ChangeEventHandler } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { Todo } from '../mocks/types/todo';
import { patchTodo } from '../util/fetcher';
import Button from './Styled/Button';
import Checkbox from './Styled/CheckBox';
import Tages from './Tags';

const Item = ({id, isCompleted, title, tags}: Todo) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(patchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const handleComplete: ChangeEventHandler<HTMLInputElement> = (e) => {
    mutate({
      id,
      isCompleted: e.target.checked
    })
  }
  
  return (
    <Styled.Wrap>
      <Styled.Item>
        <Checkbox type='checkbox' checked={isCompleted} onChange={handleComplete} />
        <span>
          {title}
        </span>
        <Button className='edit'>Edit</Button>
        <Button className='delete'>Delete</Button>
      </Styled.Item>
      {tags.trim() && 
        <Tages tags={tags} />
      }
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