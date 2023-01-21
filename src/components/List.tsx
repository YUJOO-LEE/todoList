import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Todo } from '../mocks/types/todo';
import { getTodos } from '../util/fetcher';
import Filter from './Filter';
import Item from './Item';
import NoTaskMsg from './NoTaskMsg';

const List = () => {

  // 리스트 불러오기
  const { data } = useQuery(['todos'], getTodos);

  return (
    <Styled.List>
      <div className='inner'>
        <Styled.ListHeader>
          <Styled.TotalCount>
            0 Tasks
          </Styled.TotalCount>
          <Filter />
        </Styled.ListHeader>
        {data?.data.todos.length ?
          <Styled.ListBody>
            {data.data.todos.map((item: Todo) => (
              <Item key={item.id} {...item} />
            ))}
          </Styled.ListBody>
          : <NoTaskMsg />
          }
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
}