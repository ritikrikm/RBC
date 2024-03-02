import React, { useEffect, useState, useCallback } from 'react';
import '../styling/roadTemlate.css';

const RoadmapTemplate = ({ roadmapDetails, onCardClick }) => {
  const memoizedOnCardClick = useCallback(onCardClick, []);
  const [roadmapDetai, setRoadmapDetai] = useState([]);
 

  useEffect(() => {
    // Function to fetch and parse roadmap details from local storage
    const fetchRoadmapDetails = () => {
      const details = localStorage.getItem('roadmapDetails');
      if (details) {
        setRoadmapDetai(JSON.parse(details));
      }
    };

    // Fetch details initially and set up a listener for local storage changes
    fetchRoadmapDetails();
    window.addEventListener('storage', fetchRoadmapDetails);

    // Cleanup listener
    return () => {
      window.removeEventListener('storage', fetchRoadmapDetails);
    };
  }, []);
  const statusColors = {
    'Pending': '#6f6f6f', // Gray
    'Done': '#24A148', // Green
    'In Progress': '#ff832b', // Orange
    'Reset': '#da1e28', // Red
    'Skip': '#8e6a00', // Yellow
  };

  if (!roadmapDetails) {
    return <div>No roadmap selected</div>;
  }

  return (
    <div className="roadmap-steps">
      {roadmapDetails.map((detail, index) => (
        <div key={index} className="roadmap-step" onClick={() => memoizedOnCardClick(detail)}>
          <div
            className="status-indicator"
            style={{ backgroundColor: statusColors[detail.status] || '#6f6f6f' }}
          ></div>
          <h3>{detail.title}</h3>
          <p>{detail.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RoadmapTemplate;