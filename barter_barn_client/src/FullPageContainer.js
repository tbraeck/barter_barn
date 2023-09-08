import React from 'react';

const FullPageContainer = ({ children }) => {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      {children}
    </div>
  );
};

export default FullPageContainer;
