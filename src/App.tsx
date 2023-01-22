import { useQuery } from 'react-query';
import { QueryKey } from './util/keys';
import Header from './components/Header';
import List from './components/List';
import Post from './components/Post';
import { getAllTodos } from './util/fetcher';

function App() {

  // 태그 리스트 초기화
  useQuery([QueryKey.TAGS], getAllTodos);

  return (
    <>
      <Header />
      <Post />
      <List />
    </>
  );
}

export default App;
