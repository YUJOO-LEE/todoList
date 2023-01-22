# Todo List

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typeScript&logoColor=white"/> <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=ReactQuery&logoColor=white"/> <img src="https://img.shields.io/badge/Styled-components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>

## 정보
- 이유주
- lllllllllee@gmail.com
- gitHub: https://github.com/YUJOO-LEE/todoList
- 작업 기간 : 23/01/20 ~ 23/01/23

## 설치 및 실행

### 의존성 설치
```
yarn
```

### 실행
```
yarn start
```

## 특징
- 데이터는 브라우저의 indexedDB 에 저장됩니다.
- 문자열로 된 TODO 를 저장하며, 다른 TODO 를 참조할 수 있습니다.
- 자기 자신을 참조할 수 없습니다.
- 리스트에는 작성일, 최종 수정일, 내용, 참조하고 있는 다른 TODO 가 출력됩니다.
- 리스트에서 완료/미완료 선택에 따라 필터링 가능합니다.
- 리스트 출력 시 무한 스크롤 기능합니다.
- 체크박스 선택에 따라 TODO 를 완료/미완료 처리합니다.
- 참조하고 있는 TODO 가 미완료 상태라면 현재 TODO 의 작업 완료 처리가 불가합니다.
- 삭제 시 다른 TODO 에 참조되고 있다면, 참조하는 TODO의 참조리스트에서도 삭제합니다.
