import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signupUser } from '../Redux/authSlice'; 
import './AuthPage.css'; 

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  const handleSignup = () => {
    dispatch(signupUser({ username, email, password }));
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
          <a href="#" onClick={() => setIsSignup(true)}>Sign up here</a>
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
          <a href="#" onClick={() => setIsSignup(false)}>Login here</a>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

