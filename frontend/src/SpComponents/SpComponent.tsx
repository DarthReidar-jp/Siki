import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Display from './display/display';
import Search from './display/SearchResults';
import Header from './header/header';
import Login from './Login/Login';
import Editor from './Editor/Editor';
import NewEditor from './Editor/NewEditor';

// isLoggedInを受け取れるように型定義を追加
interface SpComponentProps {
    isLoggedIn: boolean;
  }

// Propsを受け取るように関数コンポーネントを定義
const SpComponent: React.FC<SpComponentProps> = ({ isLoggedIn }) => {
    return (
      <Router>
        {isLoggedIn ? (
          <div className='app'>
            <Header />
            <main className='content'>
              <Routes>
                <Route path="/" element={<Display />} />
                <Route path="/search" element={<Search />} />
                <Route path="/new" element={<NewEditor />} />
                <Route path="/:id" element={<Editor />} />
              </Routes>
            </main>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </Router>
    );
  };
  
  export default SpComponent;