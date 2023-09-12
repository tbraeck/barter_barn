import React from 'react';

const FullPageContainer = ({children}) => {
  
  return (
    <wrapper className='wrapper-container' style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
    <section className='page-container'> 
      {children}
    </section>
    </wrapper>

   
  );
};

export default FullPageContainer;
