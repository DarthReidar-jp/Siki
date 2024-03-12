// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Display from './components/display/display';
import Sidebar from './components/sidebar/sidebar';
import Page from './components/page/Page';
import NewPage from './components/page/NewPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleGoogleLogin = async () => {
    // GoogleのOAuth認証ページへリダイレクトする
    window.location.href = `http://localhost:8000/api/auth/google`;
  };

  return (
    <Router> {/* RouterでAppコンポーネントをラップ */}
      <div className='app'>     
        <Header onSidebarToggle={handleSidebarToggle} />
        <main className={`content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Sidebar />
          <button onClick={handleGoogleLogin}>Googleでログイン</button>
          <Routes>
            <Route path="/" element={<Display />} />
            <Route path="/:id" element={<Page />} />
            <Route path="/new" element={<NewPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
