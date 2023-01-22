import { ChangeEvent, Dispatch, MouseEventHandler, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { ErrorKey } from '../asset/keys';
import { Todo } from '../mocks/types/todo';
import { putTodo } from '../util/fetcher';
import SelectTag from './SelectTag';
import Button from './Styled/Button';
import Checkbox from './Styled/CheckBox';
import Input from './Styled/Input';
import { ErrorModal } from './Styled/Modal';
// import Tages from './Tags';

const EditItem = ({
  id, isCompleted, title, tags, toggleEditMode
}: Todo & { toggleEditMode: Dispatch<React.SetStateAction<boolean>> }
) => {
  const queryClient = useQueryClient();
  const [IsCompleted, toggleCompleted] = useState(isCompleted);
  const [Title, setTitle] = useState<string>(title);
  const [Tags, setTags] = useState<string[]>(tags ? tags.split(',') : []);
  const [TitleEmpty, setTitleEmpty] = useState<boolean>(false);
  const [ErrorMsg, setErrorMsg] = useState<string>('');
  const [IsModalShown, toggleModalShown] = useState<boolean>(false);
  const selectTag = useRef<{ toggleOptions: (v: boolean) => void; }>(null);

  // 리스트 불러오기
  const { data } = queryClient.getQueryData<any>('tags');

  // 업데이트 처리
  const { mutate: updateTodo } = useMutation(putTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      queryClient.invalidateQueries('tags');
      toggleEditMode(false);
    },
  });

  // 저장 버튼 클릭 이벤트
  const handleEdit: MouseEventHandler<HTMLButtonElement> = () => {
    // title 비어있는지 확인
    if (!Title.trim()) {
      setErrorMsg(ErrorKey.TITLE);
      showModal();
      setTitleEmpty(true);
      return;
    };

    // 참조 리스트 완료되었는지 확인
    const arr = tags ? tags.split(',').filter((v: string) => {
      const id = v.slice(0, 6);
      const referTask: Todo = data.todos.find((todos: Todo) => todos.id === id);
      return !referTask?.isCompleted;
    }) : [];

    if (tags && arr.length) {
      setErrorMsg(ErrorKey.NOT_COMPLETED);
      showModal();
      return;
    };

    // 업데이트 실행
    updateTodo({ 
      id,
      isCompleted: IsCompleted,
      title: Title,
      tags: Tags.join(','),
     });
  }

  // 에러 모달 출력
  const showModal = () => {
    toggleModalShown(true);
  }

  return (
    <>
      <Styled.Item>
        <Checkbox type='checkbox'
          checked={IsCompleted}
          onChange={(e) => toggleCompleted(e.target.checked)} />
        <Input type='text' placeholder='작업 내용을 입력하세요' autoFocus
          className={`edit ${TitleEmpty ? 'error' : undefined}`}
          value={Title}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            !e.target.value ? setTitleEmpty(true) : setTitleEmpty(false);
            setTitle(e.target.value);
          }} />
        <Button className='gray' onClick={() => toggleEditMode(false)}>Cancel</Button>
        <Button className='yellow' onClick={handleEdit}>Edit</Button>
      </Styled.Item>
      <Styled.Tags>
        <SelectTag SelectedOptions={Tags} setSelectedOptions={setTags} ref={selectTag} />
        <ErrorModal show={IsModalShown} toggleShow={toggleModalShown} type={ErrorMsg} />
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