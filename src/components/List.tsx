import styled from 'styled-components';
import Filter from './Filter';
import Item from './Item';
import NoTaskMsg from './NoTaskMsg';

const List = () => {
  return (
    <Styled.List>
      <div className='inner'>
        <Styled.ListHeader>
          <Styled.TotalCount>Total count</Styled.TotalCount>
          <Filter />
        </Styled.ListHeader>
        <Styled.ListBody>
          {Array(5).fill('').map((_, idx) => (
            <Item key={idx} />
          ))}
        </Styled.ListBody>
        <NoTaskMsg />
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