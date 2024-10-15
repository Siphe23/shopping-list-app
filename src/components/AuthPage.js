import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signupUser } from '../features/authSlice'; 
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit'; 
import './AuthPage.css'; 

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { status, error } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    try {
      const action = await dispatch(loginUser({ email, password }));
      const result = unwrapResult(action);
      if (result) {
        navigate('/shopping');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  
  const handleSignup = async () => {
    try {
      const action = await dispatch(signupUser({ username, email, password }));
      const result = unwrapResult(action);
      if (result) {
        navigate('/login');
      }
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };
  
  const toggleForm = () => {
    setIsSignup(!isSignup);
    setEmail('');
    setPassword('');
    setUsername(''); // Only relevant for signup
  };

  return (
    <div className="form_main">
      <div className="heading">{isSignup ? 'Signup' : 'Login'}</div>
      <div className={`login ${isSignup ? 'hidden' : ''}`}>
        <div className="inputContainer">
          <input
            type="email"
            className="inputField"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <input
            type="password"
            className="inputField"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          <button id="button" onClick={handleLogin}>Login</button>
        )}
        {error && <p className="error">{error}</p>}
        <div className="signupContainer">
          <p>Don't have an account?</p>
          <button className="linkButton" onClick={toggleForm}>Sign up here</button>
        </div>
      </div>

      <div className={`register ${isSignup ? '' : 'hidden'}`}>
        <div className="inputContainer">
          <input
            type="text"
            className="inputField"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <input
            type="email"
            className="inputField"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <input
            type="password"
            className="inputField"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          <button id="button" onClick={handleSignup}>Signup</button>
        )}
        {error && <p className="error">{error}</p>}
        <div className="signupContainer">
          <p>Already have an account?</p>
          <button className="linkButton" onClick={toggleForm}>Login here</button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
