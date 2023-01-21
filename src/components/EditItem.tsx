import { ChangeEvent, ChangeEventHandler, Dispatch, MouseEventHandler, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { Todo } from '../mocks/types/todo';
import { patchTodo } from '../util/fetcher';
import Button from './Styled/Button';
import Checkbox from './Styled/CheckBox';
import Input from './Styled/Input';
import Tages from './Tags';

const EditItem = ({
  id, isCompleted, title, tags, setIsEditMode
}: Todo & { setIsEditMode: Dispatch<React.SetStateAction<boolean>> }
) => {
  const queryClient = useQueryClient();
  const [Title, setTitle] = useState(title);
  const [Tags, setTags] = useState(tags);

  const { mutate: toggleCompleted } = useMutation(patchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const handleComplete: ChangeEventHandler<HTMLInputElement> = (e) => {
    toggleCompleted({ id, isCompleted: e.target.checked });
  }

  return (
    <Styled.Item>
      <Checkbox type='checkbox' defaultChecked={isCompleted} />
      <Input type='text' className='title' autoFocus
        value={Title}
        onInput={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
      <Button className='gray' onClick={() => setIsEditMode(false)}>Cancel</Button>
      <Button className='yellow'>Edit</Button>
    </Styled.Item>
  )
}

export default EditItem;

const Styled = {
  Item: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;

    .title{
      flex: 1;
      border: 1px solid #ddd;
    }
    
    input[type=checkbox]{
      margin-top: 3px;
    }
  `,
}