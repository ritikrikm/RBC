// StatusBullet.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styling/bullet.css'; // Make sure to create a CSS file for styles

const StatusBullet = ({ color, size }) => {
  return <span className={`status-bullet status-bullet--${size} status-bullet--${color}`}></span>;
};

StatusBullet.propTypes = {
  color: PropTypes.oneOf(['neutral', 'primary', 'success', 'info', 'warning', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

StatusBullet.defaultProps = {
  size: 'medium',
  color: 'neutral',
};

export default StatusBullet;
