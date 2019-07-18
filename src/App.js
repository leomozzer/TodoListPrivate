import React from 'react';
import './App.css';
// import Home from './Components/Home'
import {Provider} from 'react-redux';
import AppRoutes from './Components/Router'
import store from './Store'
function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <AppRoutes/>
      </div>
    </Provider>
  );
}

export default App;
