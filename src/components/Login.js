import '../styling/login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/Dashboard');
    }
  }, [navigate]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'pass') {
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('username', username);
      navigate('/dashboard');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
