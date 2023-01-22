import { Dispatch } from 'react';
import styled from 'styled-components';
import type { TodoFilters } from '../mocks/types/todo';
import Button from './Styled/Button';

const Filter = ({ 
  setListFilter, ListFilter
}: { 
  setListFilter: Dispatch<React.SetStateAction<TodoFilters>>;
  ListFilter: string
}) => {
  return (
    <Styled.FilterList>
      <li>
        <Button className={`filter ${ListFilter === 'all' ? 'selected' : undefined}`} 
          onClick={() => setListFilter('all')}>
          All
        </Button>
        </li>
      <li>
        <Button className={`filter ${ListFilter === 'active' ? 'selected' : undefined}`} 
          onClick={() => setListFilter('active')}>
          Active
        </Button>
      </li>
      <li>
        <Button className={`filter ${ListFilter === 'completed' ? 'selected' : undefined}`} 
          onClick={() => setListFilter('completed')}>
          Completed
        </Button>
      </li>
    </Styled.FilterList>
  )
}

export default Filter;

const Styled = {
  FilterList: styled.ul`
    display: flex;
    gap: 10px;
  `,
}