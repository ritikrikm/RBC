import React, { useState, useEffect } from 'react';
import '../styling/statusbox.css'; // Import your CSS file
import useCachedState from './useCachedState';
const StatusBox = ({ identifier }) => {
  const localStorageKey = `${identifier}-status`;
  const [status, setStatus] = useCachedState(localStorageKey, 'Pending');
 const [showOptions, setShowOptions] = useState(false);
 const statusColors = {
 'Pending': '#6f6f6f', // Gray
 'Done': '#24A148', // Green
 'In Progress': '#ff832b', // Orange
 'Reset': '#da1e28', // Red
 'Skip': '#8e6a00', // Yellow
 };
 
 // Load status from local storage or use 'Pending' as default
// Listen for changes to local storage
useEffect(() => {
  const handleStorageChange = () => {
    const savedStatus = window.localStorage.getItem(localStorageKey);
    if (savedStatus) {
      setStatus(savedStatus);
    }
  };

  window.addEventListener('storage', handleStorageChange);
  window.addEventListener("visibilitychange", handleStorageChange);

  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener("visibilitychange", handleStorageChange);
  };
}, [localStorageKey, setStatus]);

 // Save status to local storage
 useEffect(() => {
    window.localStorage.setItem(localStorageKey, status);
 }, [localStorageKey,status]);

 const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setShowOptions(false); // Hide options after selection
 };

 return (
  <div className="status-box">
    <div className="status-display" onClick={() => setShowOptions(!showOptions)}>
      <span className="status-text">{status}</span>
      <span className="dropdown-arrow">▼</span>
      <div className="status-dot" style={{ backgroundColor: statusColors[status] }}></div>
    </div>
    {showOptions && (
      <ul className="status-options">
        {Object.keys(statusColors).map((status) => (
          <li key={status} onClick={() => handleStatusChange(status)}>
            {status}
          </li>
        ))}
      </ul>
    )}
  </div>
);
};

export default StatusBox;
