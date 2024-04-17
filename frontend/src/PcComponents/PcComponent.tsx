import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Display from './list/List';
import Search from './list/SearchResults';
import NewEditor from './Editor/NewEditor';
import Editor from './Editor/Editor';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import Login from './Login/Login';
import Chat from './chat/Chat';
import "./PcComponent.scss";

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
          <main className='pc-content'>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Display />} />
              <Route path="/search" element={<Search />} />
              <Route path="/new" element={<NewEditor />} />
              <Route path="/:id" element={<Editor />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </main>
        </div>
      ) : (
        <div className='pc-app'>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      )}
    </Router>
  );
};

export default PcComponent;