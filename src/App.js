import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import './App.css';

function App() {
  const user = useSelector((state) => state.auth.user); 

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/shopping" /> : <AuthPage />}
          />
          <Route
            path="/shopping"
            element={user ? (
              <>
                <h1>Shopping List</h1>
                <ShoppingForm />
                <ShoppingList />
              </>
            ) : (
              <Navigate to="/" />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

