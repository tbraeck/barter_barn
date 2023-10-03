import React, { useContext, useState, useEffect } from 'react';
import ServicesList from './general/ServicesList';
import GoodsList from './general/GoodsList';
import FreeStuffList from './general/FreeStuffList';
import { UserContext } from './contexts/UserContext';
import { useParams } from 'react-router-dom';

const FullPageContainer = ({  allForum, setAllForum }) => {
const [forum, setForum] = useState({
  goods: [],
  services: [],
  free_stuffs: []
})
console.log(allForum.goods)

// const[goods, setGoods] = useState([]);
// const[services, setServices] = useState([]);
// const[freeStuff, setFreeStuff] = useState([]);

const {user} = useContext(UserContext);
const {id} = useParams();

const isUserProfile = user.username !== forum.name

useEffect(() => {
  const selectedForum = allForum.find(f => f.id === parseInt(id));
  if (selectedForum) {
    setForum(selectedForum);
  }
}, [allForum, id]);

const allGoods = allForum.goods.map((good) => (
  <div key={good.id}>
    <GoodsList
      good={good}
      user={user}
      // category={category}
      allForum={allForum}
      // handleDeleteClick={handleDeleteClick}
      // isUserProfile={isUserProfile}
      // handleUpdateSubmit={handleUpdateSubmit}
      // handleSaveDrawingToUserProfile={handleSaveDrawingToUserProfile}
    />
  </div>
));
console.log(forum.goods)

const allServices = allForum.services.map((service) => (
  <div key={service.id}>
    <ServicesList
      service={service}
      user={user}
      // Other props for ServicesList
    />
  </div>
));

const allFreeStuff = allForum.free_stuffs.map((freeStuff) => (
  <div key={freeStuff.id}>
    <FreeStuffList
      freeStuff={freeStuff}
      user={user}
      // Other props for FreeStuffList
    />
  </div>
));
// console.log(forum.name)
console.log(forum.goods)
console.log(forum.goods)
console.log(forum.free_stuffs)


return (
  <div className="wrapper-container" style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
    <section className="page-container">
      <div className="column goods-column">
        <h2>GOODS</h2>
        {/* <ul>{allGoods}</ul> */}
      </div>
      <div className="column services-column">
        <h2>SERVICES</h2>
        {/* {allServices} */}
      </div>
      <div className="column forum-column">
        <h2>FREE STUFF</h2>
        {/* {allFreeStuff} */}
      </div>
    </section>
  </div>
);
};

export default FullPageContainer;
