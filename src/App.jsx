import React, { useState } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import ChatPage from './Pages/ChatPage';
import Home from './component/HomeComponent/Home';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/chat' element={<ChatPage />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
