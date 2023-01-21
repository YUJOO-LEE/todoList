import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { Todo } from '../mocks/types/todo';
import { deleteTodo, patchTodo } from '../util/fetcher';
import EditItem from './EditItem';
import Button from './Styled/Button';
import Checkbox from './Styled/CheckBox';
import Tages from './Tags';

const Item = (props: Todo) => {
  const {id, isCompleted, title, tags} = props;

  const queryClient = useQueryClient();
  const [IsEditMode, setIsEditMode] = useState(false);

  const { mutate: toggleCompleted } = useMutation(patchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const { mutate: deleteTask } = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const handleComplete: ChangeEventHandler<HTMLInputElement> = (e) => {
    toggleCompleted({ id, isCompleted: e.target.checked });
  }
  
  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    deleteTask({ id });
  }

  return (
    <Styled.Wrap>
      {!IsEditMode ?
        <>
          <Styled.Item>
            <Checkbox type='checkbox' checked={isCompleted} onChange={handleComplete} />
            <span>
              {title}
            </span>
            <Button className='gray' onClick={() => setIsEditMode(true)}>Edit</Button>
            <Button className='gray' onClick={handleDelete}>Delete</Button>
          </Styled.Item>
          {tags.trim() && <Tages tags={tags} /> }
        </>
      : <EditItem {...props} setIsEditMode={setIsEditMode} /> }
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