import React from 'react';
import '../styling/detail.css';
import StatusBox from './StatusBox'; 

const RoadmapDetail = ({ detail, onBack,visible,identifier }) => {
  console.log('RoadmapDetail props:', { detail, visible }); // Debug statement
 
  const detailClass = `roadmap-detail ${visible ? 'roadmap-detail--visible' : ''}`;
   
  return (
    
      <div className={detailClass}>
      <StatusBox identifier={identifier} />
        <h2 className="roadmap-detail__title">{detail.title} Basics</h2>
        <p className="roadmap-detail__description">{detail.description}</p>
        

        <button onClick={onBack} className="roadmap-detail__back-button">
          Back to {detail.title} Roadmap
        </button>
      </div>
    
  );
};

export default RoadmapDetail;