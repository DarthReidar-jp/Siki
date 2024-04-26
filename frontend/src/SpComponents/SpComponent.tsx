import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Search from './list/SearchResults';
import NewEditor from './Editor/NewEditor';
import UpdateEditor from './Editor/UpdateEditor';
import Header from './header/header';
import Login from './Login/Login';
import Chat from './chat/Chat';
import List from './list/List';

// isLoggedInを受け取れるように型定義を追加
interface PcComponentProps {
  isLoggedIn: boolean;
}

// Propsを受け取るように関数コンポーネントを定義
const PcComponent: React.FC<PcComponentProps> = ({ isLoggedIn }) => {
  return (
    <Router>
      <div className={`sp-app flex flex-col h-screen`}>
        {isLoggedIn ? (
          <>
          
            <Header />
            <main className={`sp-content w-full mt-12`}>
              <Routes>
                <Route path="/" element={<List />} />
                <Route path="/search" element={<Search />} />
                <Route path="/new" element={<NewEditor />} />
                <Route path="/:id" element={<UpdateEditor />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </main>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default PcComponent;