import React, { useState} from 'react';
import '../styling/dashboard.css'; // Ensure the path matches your CSS file's location
import RoadmapTemplate from '../components/RoadmapTemplate';
import RoadmapDetail from '../components/RoadmapDetail';
import RoadmapFlow from '../components/RoadmapFlow';
import logo from '../logo.svg';
import ReactFlow from 'react-flow-renderer';
import ToggleSwitch from '../components/ToggleSwitch'; 
import frontendLogo from '../logo/frontend.png'; // Adjust the path and repeat for each category
// import backendLogo from '../assets/images/backendLogo.png';
// import devOpsLogo from '../assets/images/devOpsLogo.png';
 const categoryLogos = {
  Frontend: frontendLogo,
  // Backend: backendLogo,
  // DevOps: devOpsLogo,
  // ...map other categories
};
const roleBasedRoadmaps = {
  Frontend: [
    { step: "1", title: "Learn HTML", description: "Understand the basics of HTML, including tags, attributes, and structure." },
    { step: "2", title: "Learn CSS", description: "Get to grips with styling, selectors, and layout techniques." },
    { step: "3", title: "Learn HTML", description: "Understand the basics of HTML, including tags, attributes, and structure." },
    { step: "4", title: "Learn CSS", description: "Get to grips with styling, selectors, and layout techniques." },
    { step: "5", title: "Learn HTML", description: "Understand the basics of HTML, including tags, attributes, and structure." },
    { step: "6", title: "Learn CSS", description: "Get to grips with styling, selectors, and layout techniques." },
    { step: "7", title: "Learn HTML", description: "Understand the basics of HTML, including tags, attributes, and structure." },
    { step: "8", title: "Learn CSS", description: "Get to grips with styling, selectors, and layout techniques." },

  ],
  Backend: [
    // Array of Backend roadmap details
  ],
  DevOps: [
    // Array of DevOps roadmap details
  ],
  FullStack:[

  ],
  Android:[

  ],
  PostgreSQL:[

  ]
  // ... other roles
};
const generateFlowData = (roadmap) => {
  let nodes = [], edges = [];
  roadmap.forEach((step, index) => {
    const position = { x: index * 200, y: 25 }; // Simple horizontal layout
    nodes.push({
      id: step.step,
      type: 'default',
      data: { label: `${step.step}. ${step.title}` },
      position
    });

    if (index > 0) {
      edges.push({
        id: `e${step.step}-${roadmap[index - 1].step}`,
        source: roadmap[index - 1].step,
        target: step.step,
      });
    }
  });

  return { nodes, edges };
};

// Adjust the component to accept a roadmap prop directly
const RoadmapFlowchart = ({ roadmap }) => {
  const flowData = generateFlowData(roadmap); // Use the passed roadmap directly
  return (
    <div style={{ height: 400 }}>
      <ReactFlow nodes={flowData.nodes} edges={flowData.edges} fitView />
    </div>
  );
};


const skillBasedRoadmaps = {
  ComputerScience: [
    // Array of Computer Science roadmap details
  ],
  React: [
    { step: "1", title: "React Fundamentals", description: "Learn about JSX, components, state, and props." },
    { step: "2", title: "Hooks", description: "Understand useState, useEffect, and custom hooks." },

  ],
  Angular:[

  ],
  Vue:[

  ],
  JavaScript:[

  ],
  NodeJS:[

  ],
  TypeScript:[],Python:[],SQL:[]
  // ... other skills
};

const Dashboard = () => {
  const [isFlowchartView, setIsFlowchartView] = useState(false);
  const [selectedRoadmapArray, setSelectedRoadmapArray] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [roadmapType, setRoadmapType] = useState(null); // 'role' or 'skill'
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (!isLoggedIn) {
    // Redirect to login page or show an unauthorized message
    return <p>Please log in to view this page.</p>;
  }

  const RoadmapHeader = () => {
    return (
      <header className="roadmap-header">
        <h1>RBC Co-op Roadmaps</h1>
        <p>RBC DevPath is a joint effort to create detailed learning paths, guides, and educational materials for RBC co-op students. It aims to equip them with the skills and knowledge needed for their tech and software development careers within the ever-changing environment of RBC.</p>
        <div className="roadmap-announcement">
          <span>NEW</span> Announcing roadmaps for teams. Learn more!
        </div>
      </header>
    );
  };
  const selectRoadmap = (type, category) => {
    console.log('Selecting roadmap:', type, category); // Debug statement
    setRoadmapType(type);
    setSelectedRoadmap(category);
    setSelectedDetail(null);
    setDetailVisible(false);

    const roadmapArray = type === 'role' ? roleBasedRoadmaps[category] : skillBasedRoadmaps[category];
    setSelectedRoadmapArray(roadmapArray);
  };
  
  const handleCardClick = (detail) => {
    console.log('Before card click - selectedDetail:', selectedDetail);
    console.log('Before card click - detailVisible:', detailVisible);
    const uniqueIdentifier = `${detail.title}-${detail.step}`;
  setSelectedDetail({ ...detail, identifier: uniqueIdentifier });
    setDetailVisible(true); // Show the detail panel
    
  };

  const handleCloseDetail = () => {
    setDetailVisible(false); // Hide the detail panel
    setSelectedDetail(null);
  };

  return (
    <main className="roadmaps-container" id="main-content">
      <RoadmapHeader />
      {detailVisible && (
        <div 
          className="roadmap-overlay roadmap-overlay--visible"
          onClick={handleCloseDetail}
        >
          <div 
            className="roadmap-detail roadmap-detail--visible"
            onClick={e => e.stopPropagation()} // Prevent click from bubbling up to the overlay
          >
           <RoadmapDetail
  detail={selectedDetail}
  onBack={handleCloseDetail}
  visible={detailVisible}
  identifier={selectedDetail.identifier} // Pass the identifier here
/>
          </div>
        </div>
      )}
  
      {!selectedRoadmap && (
        <>
          <section className="roadmap-section">
            <h2>Role based Roadmaps</h2>
            <div className="roadmap-row">
              {Object.keys(roleBasedRoadmaps).map((category) => (
                <div
                  key={category}
                  className="roadmap-category"
                  onClick={() => selectRoadmap('role', category)}
                >
                   <img src={logo} alt={`${category} logo`}  className="category-logo" />
                   {/* <img src={categoryLogos[category]} alt={`${category} logo`} style={{ maxWidth: '90%', maxHeight: '90%' }} /> */}
                  {category}
                </div>
              ))}
            </div>
            <div className="create-roadmap">
              <button>+ Create your own Roadmap</button>
            </div>
          </section>
  
          <section className="roadmap-section">
            <h2>Skill based Roadmaps</h2>
            <div className="roadmap-row">
              {Object.keys(skillBasedRoadmaps).map((category) => (
                <div
                  key={category}
                  className="roadmap-item"
                  onClick={() => selectRoadmap('skill', category)}
                >

<img src={logo} alt={`${category} logo`} className="category-logo" />
                 
                  {category}
                </div>
              ))}
            </div>
            <div className="create-roadmap">
              <button>+ Create your own Roadmap</button>
            </div>
          </section>
        </>
      )}
 <div class="toggle-switch">
  <input
    type="checkbox"
    id="view-mode"
    className="toggle-switch-checkbox"
    checked={isFlowchartView}
    onChange={e => setIsFlowchartView(e.target.checked)}
  />
  <label className="toggle-switch-label" htmlFor="view-mode">
    <span className="toggle-switch-inner" data-yes="Flowchart" data-no="Cards"></span>
    <span className="toggle-switch-switch"></span>
  </label>
</div>
      {selectedRoadmap && !selectedDetail && (
        <section className="roadmap-details">
          <h2>{selectedRoadmap} Roadmap</h2>
          <button onClick={() => setSelectedRoadmap(null)}>Back to all roadmaps</button>

          {isFlowchartView ? (
            <div className="roadmap-flowchart-container">
            <RoadmapFlow roadmap={roadmapType === 'role' ? roleBasedRoadmaps[selectedRoadmap] : skillBasedRoadmaps[selectedRoadmap]} />
            </div>
          ) : (
            <RoadmapTemplate
              roadmapDetails={roadmapType === 'role' ? roleBasedRoadmaps[selectedRoadmap] : skillBasedRoadmaps[selectedRoadmap]}
              onCardClick={handleCardClick}
            />
          )}


          {/* <div className="roadmap-flowchart-container">
          <RoadmapFlowchart roadmap={selectedRoadmapArray} />
</div> */}
          
        </section>
      )}
    </main>
  );
};

export default Dashboard;