import React, { useState, useEffect } from 'react';
import './App.css';
import User from './components/Users';
import { Form } from './components/Form';



const App = () => {

const [isAuthorized,setAuthorized] = useState(false);

const [token, setToken] = useState("");

  return (
    <div className="App">
      {isAuthorized ? <User token={token} /> : <Form setAuthorized={setAuthorized} token={token} setToken={setToken} />}
    </div>
  );
}

export default App;
