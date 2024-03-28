import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Display from './display/display';
import Search from './display/SearchResults';
import NewEditor from './Editor/NewEditor';
import Editor from './Editor/Editor';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import Login from './Login/Login';

// isLoggedInを受け取れるように型定義を追加
interface PcComponentProps {
    isLoggedIn: boolean;
  }

// Propsを受け取るように関数コンポーネントを定義
const PcComponent: React.FC<PcComponentProps> = ({ isLoggedIn }) => {
    return (
      <Router>
        {isLoggedIn ? (
          <div className='pc-app'>
            <Header />
            <main className='content'>
              <Sidebar />
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
  
  export default PcComponent;