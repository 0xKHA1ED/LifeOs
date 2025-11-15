import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SubscriptionTracker from './apps/SubscriptionTracker';
import TodoList from './apps/TodoList';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router basename="/LifeOs">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/subscription-tracker/*"
          element={
            <PrivateRoute>
              <SubscriptionTracker />
            </PrivateRoute>
          }
        />
        <Route
          path="/todo-list/*"
          element={
            <PrivateRoute>
              <TodoList />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
