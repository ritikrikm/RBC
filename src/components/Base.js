import React from 'react';
import { NavLink } from 'react-router-dom'; // Import if routing is used
import '../styling/base.css';
import { useNavigate } from 'react-router-dom';
const Base = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const username = localStorage.getItem('username'); 
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username'); // Ensure proper cleanup
    navigate('/'); // Redirect to home or login page
  };
  const handleRBCClick = () => {
    if(isLoggedIn) {
      navigate('/Dashboard');
    } else {
      navigate('/login');
    }
  };
  return (
    <div className="base-container">
      <header>
        <nav className="nav">
        <div onClick={handleRBCClick} className="nav__logo" style={{cursor: 'pointer'}}>RBC</div>
          <ul className="nav__list">
            <li className="nav__item"><NavLink to="/Dashboard" className="nav__link">Home</NavLink></li>
            <li className="nav__item"><NavLink to="/about" className="nav__link">About</NavLink></li>
            <li className="nav__item"><NavLink to="/services" className="nav__link">Services</NavLink></li>
          </ul>
          {isLoggedIn ? (
            <div className="user-info">
              Welcome <span className="username">{username}</span>
              <div className="dropdown-content">
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <button className="signin-btn">Sign In</button>
          )}
        </nav>
      </header>
      <main>{children}</main>
      <footer>This is the footer</footer>
    </div>
  );
};

export default Base;
