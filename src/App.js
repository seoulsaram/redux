import {Route} from 'react-router';
import './App.css';
import CounterContainer from './containers/CounterContainer';
import PostListContainer from './containers/PostListContainer';
import PostPage from './containers/PostPage';
import PostListPage from './pages/PostListPage';

//설치
//yarn add redux react-redux
//yarn add redux-logger
//yarn add redux-devtools-extension
//yarn add redux-thunk
function App() {
  return (
    <div className="App">
      <Route path="/" component={PostListPage} exact={true} />
      <Route path="/:id" component={PostPage} />
    </div>
  );
}

export default App;
