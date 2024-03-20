import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Display from './components/display/display';
import NewPage from './components/page/NewPage';
import Page from './components/page/Page';
import Search from './components/display/SearchResults';
import NewEditor from './components/Editer/NewEditor';
import PageEdit from './components/Editer/PageEdit';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Display />} />
      <Route path="/new" element={<NewPage />} />
      <Route path="/:id" element={<Page />} />
      <Route path="/search" element={<Search />} />
      <Route path="/newrich" element={<NewEditor />} />
      <Route path="/rich/:id" element={<PageEdit />} />
    </Routes>
  );
};

export default AppRoutes;