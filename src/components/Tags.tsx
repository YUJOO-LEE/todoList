import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import { QueryKey } from '../asset/keys';
import { ResAllData, Todo } from '../mocks/types/todo';


const Tages = ({ tags }: { tags: string }) => {
  const tagsArr = tags.split(',');
  const queryClient = useQueryClient();

  // 태그 리스트 불러오기
  const { data } = queryClient.getQueryData(QueryKey.TAGS) as {data: ResAllData};

  return (
    <Styled.TagList>
      {tagsArr.map(v => {
        const id = v.slice(0, 6);
        const referTask = data.todos
          .find((todos: Todo) => todos.id === id);

        return (
          <Styled.TagItem key={v} className={referTask?.isCompleted ? 'completed' : undefined}>
            @{v.slice(6)}
          </Styled.TagItem>
        )
        })}
    </Styled.TagList>
  )
}

export default Tages;

const Styled = {
  TagList: styled.ul`
    margin: 10px 0 0 30px;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    background-color: #f6f6f6;
    border-radius: 5px;
  `,
  TagItem: styled.li`
    font-size: 14px;
    
    &.completed{
      text-decoration: line-through;
    }
  `,
}