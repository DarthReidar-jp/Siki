import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Display from './list/List';
import Search from './list/SearchResults';
import NewEditor from './Editor/NewEditor';
import UpdateEditor from './Editor/UpdateEditor';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import Login from './Login/Login';
import Chat from './chat/Chat';
import LegacyChat from './chat/LegacyChat';
import NewProject from './project/NewProject';
import Project from './project/Project';
import NewProjectEditor from './project/Editor/NewEditor';
import ProjectEditor from './project/Editor/UpdateEditor';



interface PcComponentProps {
  isLoggedIn: boolean;
}

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
                <Route path="/" element={<Display />} />
                <Route path="/search" element={<Search />} />
                <Route path="/new" element={<NewEditor />} />
                <Route path="/page/:id" element={<UpdateEditor />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/chat/:chatId" element={<LegacyChat />} />
                <Route path="/project">
                  <Route index element={<Project />} />
                  <Route path="new" element={<NewProject />} />
                  <Route path=":projectId">
                    <Route index element={<Project />} />
                    <Route path="editor/new" element={<NewProjectEditor />} />
                    <Route path="editor/:id" element={<ProjectEditor />} />
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