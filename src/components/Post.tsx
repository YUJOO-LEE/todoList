/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEventHandler, useCallback, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { ErrorKey, QueryKey } from '../asset/keys';
import { postTodo } from '../util/fetcher';
import SelectTag from './SelectTag';
import Button from './Styled/Button';
import Input from './Styled/Input';
import { ErrorModal } from './Styled/Modal';

const Post = () => {
  const queryClient = useQueryClient();

  const [Title, setTitle] = useState<string>('');
  const [Tags, setTags] = useState<string[]>([]);
  const [TitleEmpty, setTitleEmpty] = useState<boolean>(false);
  const [IsModalShown, toggleModalShown] = useState<boolean>(false);
  const selectTag = useRef<{ toggleOptions: (v: boolean) => void; }>(null);

  // 등록 처리
  const { mutate } = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.TODOS);
      queryClient.invalidateQueries(QueryKey.TAGS);
      setTitle('');
      setTags([]);
      selectTag.current?.toggleOptions(false);
    },
    onError: (err: any) => {
      console.error(err);
    }
  });

  // 등록 버튼 이벤트
  const handleMutate: FormEventHandler = useCallback((e) => {
    e.preventDefault();
    if (!Title) {
      showModal();
      setTitleEmpty(true);
      return;
    };
    
    mutate({
      title: Title,
      tags: Tags.join(','),
    })
  }, [Tags, Title]);

  // 에러 모달 출력
  const showModal = useCallback(() => {
    toggleModalShown(true);
  }, []);

  return (
    <Styled.Post>
      <div className='inner'>
        <Styled.Form onSubmit={handleMutate}>
          <Input type='text' placeholder='작업 내용을 입력하세요' 
            className={TitleEmpty ? 'error' : undefined}
            value={Title} 
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              !e.target.value ? setTitleEmpty(true) : setTitleEmpty(false);
              setTitle(e.target.value)}
            } />
          <Styled.Tags>
            <SelectTag SelectedOptions={Tags} setSelectedOptions={setTags} ref={selectTag} />
          </Styled.Tags>
          <Button className='add'>Add Todo</Button>
        </Styled.Form>
      </div>
      <ErrorModal show={IsModalShown} toggleShow={toggleModalShown} type={ErrorKey.TITLE} />
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
    align-items: flex-start;
    gap: 10px;

    input[type=text]:first-of-type{
      flex: 1;
    }
  `,
  Tags: styled.div`
    width: 320px;
  `,
}