import React from 'react';
import ServicesList from './ServicesList';
import GoodsList from './GoodsList';
import ForumList from './ForumList';

const FullPageContainer = ({ allForum, setAllForum, allGoods, setAllGoods, allServices, setAllServices }) => {
  return (
    <div className='wrapper-container' style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <section className='page-container'>
        <div className='column forum-column'>
          <ForumList allForum={allForum} setAllForum={setAllForum}/>
        </div>
        <div className='column goods-column'>
          <GoodsList allGoods={allGoods} setAllGoods={setAllGoods}/>
        </div>
        <div className='column services-column'>
          <ServicesList allServices={allServices} setAllServices={setAllServices}/>        
        </div>
      </section>
    </div>
  );
};

export default FullPageContainer;
