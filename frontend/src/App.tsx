// App.tsx
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [backendData, setBackendData] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api")
      .then(response => response.json())
      .then(data => setBackendData(data.message))
      .catch(error => console.error("Error fetching data: ", error));
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>{backendData}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
