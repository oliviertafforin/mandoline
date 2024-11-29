import './App.css';
import React, { useEffect, useState } from 'react';
import { getHelloMessage } from './services/api';
function App() {

  const [message, setMessage] = useState('');


  useEffect(() => {
    getHelloMessage().then(setMessage);
}, []);

  return (
    <div>
      <h1>test v5 : {message}</h1>
    </div>
  );
}

export default App;
