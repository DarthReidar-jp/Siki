import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Display from './PcComponents/display/display';
import Search from './PcComponents/display/SearchResults';
import NewEditor from './PcComponents/Editor/NewEditor';
import Editor from './PcComponents/Editor/Editor';
import Header from './PcComponents/header/header';
import Sidebar from './PcComponents/sidebar/sidebar';
import Login from './PcComponents/Login/Login';

// isLoggedInを受け取れるように型定義を追加
interface PcComponentProps {
    isLoggedIn: boolean;
  }

// Propsを受け取るように関数コンポーネントを定義
const PcComponent: React.FC<PcComponentProps> = ({ isLoggedIn }) => {
    return (
      <Router>
        {isLoggedIn ? (
          <div className='app'>
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