import React from 'react';
import ServicesList from './general/ServicesList';
import GoodsList from './general/GoodsList';
import FreeStuffList from './general/FreeStuffList';

const FullPageContainer = ({ allFreeStuff, setAllFreeStuff, allForum, setAllForum, allGoods, setAllGoods, allServices, setAllServices }) => {
  return (
    <div className='wrapper-container' style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <section className='page-container'>
       
        <div className='column goods-column'>
          <GoodsList allGoods={allGoods} setAllGoods={setAllGoods}/>
        </div>
        <div className='column services-column'>
          <ServicesList allServices={allServices} setAllServices={setAllServices}/>        
        </div>
        <div className='column forum-column'>
          <FreeStuffList allFreeStuff={allFreeStuff} setAllFreeStuff={setAllFreeStuff}/>
        </div>
      </section>
    </div>
  );
};

export default FullPageContainer;
