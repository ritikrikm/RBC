import React, { useMemo } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';

const createNodesAndEdgesFromRoadmap = (roadmap) => {
  const nodes = roadmap.map((item, index) => ({
    id: item.step,
    data: { label: `${item.step}. ${item.title}` },
    position: { x: 100, y: index * 100 },
    style: { border: '1px solid #ddd', padding: 10 },
  }));

  const edges = roadmap.slice(1).map((item, index) => ({
    id: `e${item.step}`,
    source: roadmap[index].step,
    target: item.step,
    animated: true,
  }));

  return { nodes, edges };
};

const RoadmapFlow = ({ roadmap }) => {
  const { nodes, edges } = useMemo(() => createNodesAndEdgesFromRoadmap(roadmap), [roadmap]);

  return (
    <div style={{ height: 800 }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

// Example usage:
// <RoadmapFlowchart roadmap={roleBasedRoadmaps.Frontend} />


export default RoadmapFlow;
