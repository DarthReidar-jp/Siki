import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Display from './list/list';
import Search from './list/SearchResults';
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
        <div className='sp-app'>
          <Header />
          <main className='sp-content'>
            <Routes>
              <Route path="/" element={<Display />} />
              <Route path="/search" element={<Search />} />
              <Route path="/new" element={<NewEditor />} />
              <Route path="/:id" element={<Editor />} />
            </Routes>
          </main>
        </div>
      ) : (
        <div className='sp-app'>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      )}
    </Router>
  );
};

export default SpComponent;