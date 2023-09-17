import React from 'react';
import GoodsList from './GoodsList';
import ServicesList from './ServicesList';
import ForumList from './ForumList';

const FullPageContainer = ({allForum, setAllForum}) => {
  
  return (
    <div className='wrapper-container' style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
    <section className='page-container'> 
    <FullPageContainer>
        <ForumList allForum={allForum} setAllForum={setAllForum}/>
        <GoodsList />
        <ServicesList />
      </FullPageContainer>
    </section>
    </div>

   
  );
};

export default FullPageContainer;
