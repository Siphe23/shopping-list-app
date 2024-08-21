import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import logo from './assets/logo.png';  // Relative path based on the file's location




import './App.css';

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <div className="App">
        {/* Add the image here */}
        <img src={logo} alt="Logo" className="App-logo" />

        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/shopping" /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/shopping" /> : <AuthPage />}
          />
          <Route
            path="/shopping"
            element={user ? (
              <div>
                <h1>Shopping List</h1>
                <ShoppingForm />
                <ShoppingList />
              </div>
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route
            path="*"
            element={<Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

