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

    
  return (
    <Router> {/* RouterでAppコンポーネントをラップ */}
      <div className='app'>     
        <Header onSidebarToggle={handleSidebarToggle} />
        <main className={`content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Sidebar />
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
