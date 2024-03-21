import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Display from './components/display/display';
import Search from './components/display/SearchResults';
import NewEditor from './components/Editor/NewEditor';
import Editor from './components/Editor/Editor';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Display />} />
      <Route path="/search" element={<Search />} />
      <Route path="/new" element={<NewEditor />} />
      <Route path="/:id" element={<Editor />} />
    </Routes>
  );
};

export default AppRoutes;