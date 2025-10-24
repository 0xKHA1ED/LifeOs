import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardPage from '../components/DashboardPage';
import AddNewPage from '../components/AddNewPage';
import SettingsPage from '../components/SettingsPage';
import BottomNav from '../components/BottomNav';
import EditSubscriptionPage from '../components/EditSubscriptionPage';

const SubscriptionTracker = () => {
  return (
    <div id="app-container" className="relative mx-auto flex min-h-screen w-full bg-background-light dark:bg-background-dark">
      <Sidebar />
      <div className="flex-grow pb-24 md:pb-0">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="add-new" element={<AddNewPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="edit/:id" element={<EditSubscriptionPage />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
};

export default SubscriptionTracker;
