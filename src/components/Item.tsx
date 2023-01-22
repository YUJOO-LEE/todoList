/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEventHandler, Dispatch, MouseEventHandler, useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { ErrorKey, QueryKey } from '../util/keys';
import { ResAllData, Todo } from '../mocks/types/todo';
import dataFormat from '../util/dateFormat';
import { deleteTodo, patchTodo } from '../util/fetcher';
import EditItem from './EditItem';
import Button from './Styled/Button';
import Checkbox from './Styled/CheckBox';
import { ErrorModal } from './Styled/Modal';
import Tages from './Tags';

const Item = (props: 
  Todo & { EditMode: [boolean, string]; setEditMode: Dispatch<React.SetStateAction<[boolean, string]>> }
) => {

  const { id, isCompleted, title, tags, EditMode, createdAt, updatedAt, setEditMode } = props;
  const queryClient = useQueryClient();
  const [IsModalShown, toggleModalShown] = useState<boolean>(false);

  // 날짜 출력용으로 변환
  const printCreatedAt: string = dataFormat(createdAt);
  const printUpdatedAt: string = dataFormat(updatedAt);

  // 태그 리스트 불러오기
  const { data } = queryClient.getQueryData(QueryKey.TAGS) as {data: ResAllData};

  // 완료 데이터 patch
  const { mutate: toggleCompleted } = useMutation(patchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.TODOS);
      queryClient.invalidateQueries(QueryKey.TAGS);
    },
  });

  // 데이터 삭제
  const { mutate: deleteTask } = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.TODOS);
    },
  });

  // 체크박스 선택 이벤트
  const handleComplete: ChangeEventHandler<HTMLInputElement> = (e) => {
    const arr = tags ? tags.split(',').filter((v: string) => {
      const id = v.slice(0, 6);
      const referTask = data.todos.find((todos: Todo) => todos.id === id);
      return !referTask?.isCompleted;
    }) : [];
    
    if (tags && arr.length) return showModal();
    toggleCompleted({ id, isCompleted: e.target.checked });
  }
  
  // 삭제 버튼 이벤트
  const handleDelete: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    deleteTask({ id });
  }, []);

  // 에러 모달 출력
  const showModal = useCallback(() => {
    toggleModalShown(true);
  }, []);

  return (
    <Styled.Wrap>
      {!(EditMode[0] && EditMode[1] === id) ?
        <>
          <Styled.Item>
            <Checkbox type='checkbox' checked={isCompleted} onChange={handleComplete} />
            <Styled.Title>
              {title}
            </Styled.Title>
            <Styled.Date>
              <p>Created {printCreatedAt}</p>
              {printCreatedAt !== printUpdatedAt &&
                <p>Last Updated {printUpdatedAt}</p>}
            </Styled.Date>
            <Button className='gray' onClick={() => setEditMode([true, id])}>Edit</Button>
            <Button className='gray' onClick={handleDelete}>Delete</Button>
          </Styled.Item>
          {tags.trim() && <Tages tags={tags} /> }
        </>
      : <EditItem {...props} /> }
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
  `,
  Title: styled.p`
    flex: 1;
  `,
  Date: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    
    p{
      font-size: 12px;
      color: #666;
    }
  `,
}