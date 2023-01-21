import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';
import useIntersecting from '../hook/useIntersecting';
import { Todo } from '../mocks/types/todo';
import { getTodos } from '../util/fetcher';
import Filter from './Filter';
import Item from './Item';
import NoTaskMsg from './NoTaskMsg';

const List = () => {

  // 리스트 불러오기
  const { data, isSuccess, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(['todos'], getTodos, {
    getNextPageParam: (lastPage) => lastPage.data.paging.next,
  });

  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const Intersecting = useIntersecting(fetchMoreRef, isSuccess);

  // 다음 데이터 호출
  useEffect(() => {
    if (!Intersecting || !isSuccess || isLoading || !hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [Intersecting])

  return (
    <Styled.List>
      <div className='inner'>
        <Styled.ListHeader>
          <Styled.TotalCount>
            {data?.pages[0].data.total} Tasks
          </Styled.TotalCount>
          <Filter />
        </Styled.ListHeader>
        {data?.pages[0].data.total ?
          <Styled.ListBody>
            {data.pages?.map((page) => (
              page.data.todos.map((item: Todo) => (
                <Item key={item.id} {...item} />
              ))
            ))}
          </Styled.ListBody>
          : <NoTaskMsg />
          }
        <Styled.FetchMore ref={fetchMoreRef} />
      </div>
    </Styled.List>
  )
}

export default List;

const Styled = {
  List: styled.div`
    padding: 20px;
    font-size: 16px;
  `,
  ListHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,
  TotalCount: styled.h2`
    font-size: 14px;
  `,
  ListBody: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  FetchMore: styled.div`
    width: 100%;
    height: 50px;
    margin-bottom: 50px;
  `,
}