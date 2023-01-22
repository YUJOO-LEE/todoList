import { ChangeEvent, Dispatch, MouseEventHandler, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { Todo } from '../mocks/types/todo';
import { putTodo } from '../util/fetcher';
import SelectTag from './SelectTag';
import Button from './Styled/Button';
import Checkbox from './Styled/CheckBox';
import Input from './Styled/Input';
// import Tages from './Tags';

const EditItem = ({
  id, isCompleted, title, tags, setIsEditMode
}: Todo & { setIsEditMode: Dispatch<React.SetStateAction<boolean>> }
) => {
  const queryClient = useQueryClient();
  const [IsCompleted, setIsCompleted] = useState(isCompleted);
  const [Title, setTitle] = useState<string>(title);
  const [Tags, setTags] = useState<string[]>(tags ? tags.split(',') : []);
  // const [TitleEmpty, setTitleEmpty] = useState<boolean>(false);
  const selectTag = useRef<{ setIsOpenOptions: (v: boolean) => void; }>(null);

  const { mutate: updateTodo } = useMutation(putTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      setIsEditMode(false);
    },
  });

  const handleEdit: MouseEventHandler<HTMLButtonElement> = () => {
    updateTodo({ 
      id,
      isCompleted: IsCompleted,
      title: Title,
      tags: Tags.join(','),
     });
  }

  return (
    <>
      <Styled.Item>
        <Checkbox type='checkbox'
          checked={IsCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)} />
        <Input type='text' className='title' autoFocus
          value={Title}
          onInput={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
        <Button className='gray' onClick={() => setIsEditMode(false)}>Cancel</Button>
        <Button className='yellow' onClick={handleEdit}>Edit</Button>
      </Styled.Item>
      <Styled.Tags>
        <SelectTag SelectedOptions={Tags} setSelectedOptions={setTags} ref={selectTag} />
      </Styled.Tags>
    </>
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
  Tags: styled.div`
    margin: 10px 0 0 30px;
    border: 1px solid #ddd;
    border-radius: 5px;
  `,
}