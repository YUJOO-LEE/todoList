import styled from 'styled-components';


const Tages = () => {
  return (
    <Styled.TagList>
      <Styled.TagItem>@Tag1</Styled.TagItem>
      <Styled.TagItem>@Tag2</Styled.TagItem>
      <Styled.TagItem>@Tag3</Styled.TagItem>
    </Styled.TagList>
  )
}

export default Tages;

const Styled = {
  TagList: styled.ul`
    margin: 10px 0 0 30px;
    padding: 10px;
    display: flex;
    gap: 10px;
    background-color: #f6f6f6;
    border-radius: 5px;
  `,
  TagItem: styled.li`
    font-size: 14px;
  `,
}