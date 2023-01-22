/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';
import { QueryKey } from '../asset/keys';
import useIntersecting from '../hook/useIntersecting';
import type { Todo, TodoFilters } from '../mocks/types/todo';
import { getTodos } from '../util/fetcher';
import Filter from './Filter';
import Item from './Item';
import NoTaskMsg from './NoTaskMsg';
import Button from './Styled/Button';

const List = () => {
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const Intersecting = useIntersecting(fetchMoreRef);
  const [ListFilter, setListFilter] = useState<TodoFilters>('all');
  const [EditMode, setEditMode] = useState<[boolean, string]>([false, '']);

  // 리스트 불러오기
  const { 
    data, isSuccess, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, refetch
  } = useInfiniteQuery(
    [QueryKey.TODOS],
    ({ pageParam = 0 }) => getTodos({ pageParam }, ListFilter), {
      getNextPageParam: (lastPage) => lastPage.data.paging.next,
    }
  );

  // 다음 데이터 호출
  useEffect(() => {
    if (!Intersecting || !isSuccess || isLoading || !hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [Intersecting]);

  // 필터 변경 시 refetch
  useEffect(() => {
    refetch();
  }, [ListFilter]);

  return (
    <Styled.List>
      <div className='inner'>
        <Styled.ListHeader>
          <Styled.TotalCount>
            {data?.pages[0].data.total} Tasks
          </Styled.TotalCount>
          <Filter setListFilter={setListFilter} ListFilter={ListFilter} />
        </Styled.ListHeader>
        <Styled.ListBody>
          {isSuccess && data.pages.map((page) => (
            page.data.todos.map((item: Todo) => (
              <Item key={item.id} {...item} setEditMode={setEditMode} EditMode={EditMode} />
            ))
          ))}
        </Styled.ListBody>
        {hasNextPage &&
          <Button onClick={()=>fetchNextPage()} className='viewMore'>View more</Button>}
        <Styled.FetchMore ref={fetchMoreRef} />
        {(isSuccess && !data?.pages[0].data.total) && <NoTaskMsg /> }
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