import React from 'react';
import Container from './component/Container';
import './css/App.css';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Container />
      </Provider>
      ,
    </>
  );
}

export default App;
