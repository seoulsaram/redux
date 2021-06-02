import './App.css';
import CounterContainer from './containers/CounterContainer';

//설치
//yarn add redux react-redux
//yarn add redux-logger
//yarn add redux-devtools-extension
//yarn add redux-thunk
function App() {
  return (
    <div className="App">
      <CounterContainer />
    </div>
  );
}

export default App;
