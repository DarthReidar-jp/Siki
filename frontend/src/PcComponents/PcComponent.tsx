import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { PcComponentProps } from '../utils/types/types';

import List from './list/List';
import Search from './list/SearchResults';
import NewEditor from './Editor/NewEditor';
import UpdateEditor from './Editor/UpdateEditor';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import Login from './Login/Login';
import NewChat from './chat/NewChat';
import LegacyChat from './chat/LegacyChat';
import NewProject from './project/NewProject';


const PcComponent: React.FC<PcComponentProps> = ({ isLoggedIn }) => {
  return (
    <Router>
      <div className={`pc-app flex flex-col h-screen`}>
        {isLoggedIn ? (
          <>
            <Header />
            <main className={`pc-content w-full mt-12`}>
              <Sidebar />
              <Routes>
                <Route path="/" element={<List />} />
                <Route path="/search" element={<Search />} />
                <Route path="/new" element={<NewEditor />} />
                <Route path="/page/:id" element={<UpdateEditor />} />
                <Route path="/chat" element={<NewChat />} />
                <Route path="/chat/:chatId" element={<LegacyChat />} />
                <Route path="/project">
                  <Route path="new" element={<NewProject />} />
                  <Route path=":projectId">
                    <Route index element={<List />} />
                    <Route path="new" element={<NewEditor />} />
                    <Route path=":id" element={<UpdateEditor />} />
                    <Route path="search" element={<Search />} />
                    <Route path="chat" element={<NewChat />} />
                    <Route path="chat/:chatId" element={<LegacyChat />} />
                  </Route>
                </Route>
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