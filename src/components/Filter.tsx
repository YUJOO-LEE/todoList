import styled from 'styled-components';
import Button from './Styled/Button';

const Filter = () => {
  return (
    <Styled.FilterList>
      <li><Button className='filter selected'>All</Button></li>
      <li><Button className='filter'>Active</Button></li>
      <li><Button className='filter'>Completed</Button></li>
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