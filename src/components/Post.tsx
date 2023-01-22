import { ChangeEvent, FormEventHandler, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { postTodo } from '../util/fetcher';
import SelectTag from './SelectTag';
import Button from './Styled/Button';
import Input from './Styled/Input';

const Post = () => {
  const queryClient = useQueryClient();

  const [Title, setTitle] = useState<string>('');
  const [Tags, setTags] = useState<string[]>([]);
  const [TitleEmpty, setTitleEmpty] = useState<boolean>(false);
  const selectTag = useRef<{ setIsOpenOptions: (v: boolean) => void; }>(null);

  // 등록 처리
  const { mutate } = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      setTitle('');
      setTags([]);
      selectTag.current?.setIsOpenOptions(false);
    },
    onError: (err: any) => {
      console.error(err);
    }
  });

  const handleMutate: FormEventHandler = (e) => {
    e.preventDefault();

    if (!Title) {
      return setTitleEmpty(true);
    }
    
    mutate({
      title: Title,
      tags: Tags.join(','),
    })
  }

  return (
    <Styled.Post>
      <div className='inner'>
        <Styled.Form onSubmit={handleMutate}>
          <Input type='text' placeholder='Things to do' 
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