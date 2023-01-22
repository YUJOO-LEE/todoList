import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { ErrorKey } from '../asset/keys';
import { Todo } from '../mocks/types/todo';
import { deleteTodo, patchTodo } from '../util/fetcher';
import EditItem from './EditItem';
import Button from './Styled/Button';
import Checkbox from './Styled/CheckBox';
import { ErrorModal } from './Styled/Modal';
import Tages from './Tags';

const Item = (props: Todo) => {
  const {id, isCompleted, title, tags} = props;

  const queryClient = useQueryClient();
  const [IsEditMode, toggleEditMode] = useState<boolean>(false);
  const [IsModalShown, toggleModalShown] = useState<boolean>(false);

  // 리스트 불러오기
  const { data } = queryClient.getQueryData<any>('tags');

  // 완료 데이터 patch
  const { mutate: toggleCompleted } = useMutation(patchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      queryClient.invalidateQueries('tags');
    },
  });

  // 데이터 삭제
  const { mutate: deleteTask } = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  // 체크박스 선택 이벤트
  const handleComplete: ChangeEventHandler<HTMLInputElement> = (e) => {
    const arr = tags ? tags.split(',').filter((v: string) => {
      const id = v.slice(0, 6);
      const referTask: Todo = data.todos.find((todos: Todo) => todos.id === id);
      return !referTask?.isCompleted;
    }) : [];
    
    if (tags && arr.length) return showModal();
    toggleCompleted({ id, isCompleted: e.target.checked });
  }
  
  // 삭제 버튼 이벤트
  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    deleteTask({ id });
  }

  // 에러 모달 출력
  const showModal = () => {
    toggleModalShown(true);
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
            <Button className='gray' onClick={() => toggleEditMode(true)}>Edit</Button>
            <Button className='gray' onClick={handleDelete}>Delete</Button>
          </Styled.Item>
          {tags.trim() && <Tages tags={tags} /> }
        </>
      : <EditItem {...props} toggleEditMode={toggleEditMode} /> }
      <ErrorModal show={IsModalShown} toggleShow={toggleModalShown} type={ErrorKey.NOT_COMPLETED} />
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