import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { postTodo } from '../util/fetcher';
import Button from './Styled/Button';
import Input from './Styled/Input';

const Post = () => {
  const queryClient = useQueryClient();

  const [Title, setTitle] = useState<string>('');
  const [Tages, setTages] = useState<string>('');

  // 등록 처리
  const { mutate } = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      setTitle('');
      setTages('');
    },
    onError: (err: any) => {
      console.log('실패했습니다');
    }
  });

  const handleMutate: FormEventHandler = (e) => {
    e.preventDefault();

    mutate({
      title: Title,
      tags: Tages,
    })
  }

  return (
    <Styled.Post>
      <div className='inner'>
        <Styled.Form onSubmit={handleMutate}>
          <Input type='text' placeholder='Things to do' value={Title} onInput={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
          <Input type='text' placeholder='Tag' value={Tages} onInput={(e: ChangeEvent<HTMLInputElement>) => setTages(e.target.value)} />
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
    gap: 10px;

    input:first-of-type{
      flex: 1;
    }
  `,
}