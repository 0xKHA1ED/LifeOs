import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './components/DashboardPage';
import AddNewPage from './components/AddNewPage';
import SettingsPage from './components/SettingsPage';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <Router>
      <div id="app-container" className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col md:flex-row">
        <Sidebar />
        <div className="flex-grow pb-24 md:pb-0">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/add-new" element={<AddNewPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
