// App.tsx
import React from 'react';
import './App.css';
import Header from './components/header/header';
import Display from './components/display/display';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Display />
      </main>
    </div>
  );
};

export default App;
