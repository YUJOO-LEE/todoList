import styled from 'styled-components';
import { ChangeEventHandler, Dispatch, forwardRef, SetStateAction, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { useQueryClient } from 'react-query';
import { ResAllData, Todo } from '../mocks/types/todo';
import { QueryKey } from '../asset/keys';

type Props = {
  SelectedOptions: string[], 
  setSelectedOptions: Dispatch<SetStateAction<string[]>>
};

type ImperativeHandle = { toggleOptions: (v: boolean) => void; }

const SelectTag = forwardRef<ImperativeHandle, Props>(({ 
  SelectedOptions, setSelectedOptions
}, ref) => {

  const queryClient = useQueryClient();
  const [IsOpenOptions, toggleOptions] = useState<boolean>(false);

  // 부모 컴포넌트에서 제어할 수 있도록 ref로 toggleOptions 반환
  useImperativeHandle(
    ref,
    () => ({
      toggleOptions: (v: boolean) => toggleOptions(v),
    })
  )

  // 태그 리스트 불러오기
  const data = queryClient.getQueryData(QueryKey.TAGS) as {data: ResAllData};

  // 체크박스 이벤트
  const OnSelect: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const selectedOption = e.target.value;
    let newSelectedOptions: string[];

    if (SelectedOptions.includes(selectedOption)) {
      newSelectedOptions = SelectedOptions.filter(option => option !== selectedOption);
    } else {
      newSelectedOptions = [...SelectedOptions, selectedOption];
    }

    setSelectedOptions(newSelectedOptions);
  }, [SelectedOptions, setSelectedOptions]);

  // 옵션 열때마다 tag 리스트 갱신
  useEffect(() => {
    if (!IsOpenOptions) return;
    
    queryClient.invalidateQueries('tags');
  }, [IsOpenOptions, queryClient])

  return (
    <Styled.Warpper>
      <Styled.SelectDiv id='startup' tabIndex={0}
        onFocus={() => toggleOptions(true)}
        className={IsOpenOptions ? 'on' : undefined}>
        {!SelectedOptions.length
          ? '선택해주세요' 
          : SelectedOptions.map((option) => {
            const id = parseInt(option.slice(0, 6));
            return <span key={'selectedTags' + id}>{id}</span>;
          })
        }
      </Styled.SelectDiv>
      <Styled.OptionsDiv className={IsOpenOptions ? 'on' : undefined}>
        {data?.data.todos.map(({ title, id }: Todo) => {
          const referTask = data.data.todos
            .find((todos: Todo) => todos.id === id);

          return (
            <label key={'tags' + id} className={referTask?.isCompleted ? 'completed' : undefined}>
              <input type='checkbox'
                value={id + title}
                onChange={OnSelect}
                checked={SelectedOptions.includes(id + title)}
              />
              {title}
            </label>
          );
        })}
        {!data?.data.todos.length &&
          <p className='error'>No Tasks</p>
        }
      </Styled.OptionsDiv>
      <Styled.OpenButton
        onClick={() => toggleOptions(prev => !prev)}
        className={IsOpenOptions ? 'on' : undefined} />
  </Styled.Warpper>
  )
});

export default SelectTag;

const Styled = {
  Warpper: styled.div`
    position: relative;
  `,
  SelectDiv: styled.div`
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    padding: 8px;
    border-radius: 5px;
    font-size: 16px;
    line-height: 28px;
    background-color: #fff;
    color: #888;

    span{
      flex: 0 0 auto;
      height: 28px;
      padding: 0 10px;
      background: #F0F6FF;
      border-radius: 5px;
      font-size: 16px;
      line-height: 28px;
      color: #338BFF;
    }

    &.on{
      border-radius: 5px 5px 0 0;
    }
  `,
  OptionsDiv: styled.div`
    width: calc(100% + 2px);
    max-height: 200px;
    display: none;
    overflow-y: auto;
    padding: 15px;
    position: absolute;
    left: -1px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 0 0 5px 5px;

    label{
      flex: 1;
      width: 100%;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
      line-height: 2;
      color: #000;

      &.completed{
        text-decoration: line-through;
      }

      input{
        margin-right: 10px;
      }
    }

    p.error{
      text-align: center;
      font-size: 14px;
      color: #666;
    }

    &.on{
      display: block;
    }
  `,
  OpenButton: styled.i`
    width: 38px;
    height: 28px;
    display: inline-block;
    position: absolute;
    top: 8px;
    right: 0;
    z-index: 1;
    background-color: #fff;
    cursor: pointer;

    &::before{
      content: '';
      display: block;
      width: 10px;
      height: 1px;
      position: absolute;
      top: 15px;
      right: 12px;
      background-color: #888;
      transform: rotate(-45deg);
    }

    &::after{
      content: '';
      display: block;
      width: 10px;
      height: 1px;
      position: absolute;
      top: 15px;
      right: 19px;
      background-color: #888;
      transform: rotate(45deg);
    }

    &.on{
      &::before{
          transform: rotate(45deg);
        }

        &::after{
          transform: rotate(-45deg);
        }
    }
  `,

};