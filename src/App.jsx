import React, { useContext } from 'react';
import './App.css';
import {RouterPath} from './routes/index'
import LogIn from './pages/LogIn';
import { Context } from './context/Context';

function App() {
  const {token} = useContext(Context)
  if (token) {
    return <RouterPath/>
  }
  else{
    return <LogIn/>
  }
}

export default App;