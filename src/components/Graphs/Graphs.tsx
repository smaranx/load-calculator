import React from 'react';
import MAC from './MAC';
import Primary from './Primary';
import Secondary from './Secondary';

const Graphs = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <MAC />
      <Primary />
      <Secondary />
    </div>
  );
};

export default Graphs;
