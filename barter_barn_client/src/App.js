
import React, {useState, useEffect, useContext} from 'react'; 
import './main.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './general/Home';
import Header from './general/Header';
import Login from './general/login-components/Login.js';
import Footer from './general/Footer';
import GoodsCard from './general/goods-components/GoodsCard';
import ServicesCard from './general/services-components/ServicesCard';
import FreeStuffCard from './general/free-stuff-components/FreeStuffCard';
import ForumList from './general/forum-components/ForumList';
import FeatureCard from './general/FeatureCard';
import ForumCard from './general/forum-components/ForumCard';
import EditGoods from './general/editing-components/EditGoods';
import EditServices from './general/editing-components/EditServices';
import EditFreeStuffs from './general/editing-components/EditFreeStuff';
import UserProfile from './general/user-info/UserProfile.js';
import { UserContext } from './contexts/UserContext';
import { ForumContext } from './contexts/ForumContext';

function App() {
  // const [allForum, setAllForum] = useState([]);
  const [allGoods, setAllGoods] = useState([])
  const [userFreeStuff, setUserFreeStuff] = useState([])
  
  // const [userComments, setUserComments] = useState([]);
  const {user, setUser} = useContext(UserContext);
const {allForum, setAllForum } = useContext(ForumContext)
  
useEffect(()=> {
      fetch('/goods')
      .then((res)=> res.json())
      .then((data) => setAllGoods(data))
      .catch((error) => console.error('Error fetching goods:', error));

      

  }, [])
// const handleAddGood = (newGood) => {
//     const newGoodArray = [...allForum, newGood]
//     setAllForum(newGoodArray)
//     }

// const handleAddService = (newService) => {
//       const newServiceArray = [...allForum, newService]
//       setAllForum(newServiceArray)
//       }

      // const handleUpdateFreeStuffs = (newStuff) => {
      //   // Filter out the claimed item from allForum
      //   const updatedAllForum = allForum.filter((item) => item.id !== newStuff.id);
      //   setAllForum(updatedAllForum);
      // };
      

    const handleLogout = ()=> {
      setUser(null)
    }

    const handleAddToUserFreeStuff = (newStuff) => {
      // Check if the claimed item is not already in the userFreeStuff array
      if (!userFreeStuff.some(item => item.id === newStuff.id)) {
        // Check if the item is visible or non-visible based on claimant_id
        if (newStuff.claimant_id === null) {
          // Item is visible to the user
          const updatedUserFreeStuff = [...userFreeStuff, newStuff];
          setUserFreeStuff(updatedUserFreeStuff);
        }
      }
    };

    const handleUpdateFreeStuffs = (updatedStuff) => {
      const updatedAllForum = [...allForum];
    
      const itemIndex = updatedAllForum[2].free_stuffs.findIndex(element => (
           element.id === updatedStuff.id
      ))
    // console.log(updatedAllForum)
    
      updatedAllForum[2].free_stuffs[itemIndex] = updatedStuff
      
    // debugger
      setAllForum(updatedAllForum);
      handleAddToUserFreeStuff(updatedStuff);
    };

  // const handleUpdateGoods = (updatedGood) => {
  //     const editedGood = allGoods.map((good) => {
  //       if (good.id === updatedGood.id) {
  //         return editedGood
  //       } else {
  //         return good;
  //       } 
  //     });
  //     setAllForum(editedGood)
  //   }

// const handleUpdateServices = (updatedService) => {
//       const editedService = allServices.map((service) => {
//         if (service.id === updatedService.id) {
//           return editedService
//         } else {
//           return service;
//         } 
//       });
//       setAllForum(editedService)
//     }

// const handleUpdateFreeStuffs = (updatedStuff) => {
//       const editedFreeStuff = allFreeStuffs.map((stuff) => {
//         if (stuff.id === updatedStuff.id) {
//           return editedFreeStuff
//         } else {
//           return stuff;
//         } 
//       });
//       setAllForum(editedFreeStuff)
//     }
   
if(!user) return <Login  />

  return (
    <div className='mainContainer'>
        <div className="header">
              <Header user={user} setUser={setUser} handleLogout={handleLogout} />
        </div>
          <div>
            <Routes>
                <Route exact path="/" element={<Home /> } />  
                <Route path="/forums" element={<ForumList allForum={allForum}  setAllForum={setAllForum} /> }/>
              <Route path="/forums/:id" element={<ForumCard  handleUpdateFreeStuffs={handleUpdateFreeStuffs} allForum={allForum} setAllForum={setAllForum}  />} />
                <Route path="/goods/:id" element={<GoodsCard    allForum={allForum} setAllForum={setAllForum}   />}/> 
                <Route path="/services/:id" element={<ServicesCard  allForum={allForum} setAllForum={setAllForum}  />}/> 
                <Route path="/free_stuffs/:id" element={<FreeStuffCard handleUpdateFreeStuffs={handleUpdateFreeStuffs}   allForum={allForum} setAllForum={setAllForum} />}/>
                <Route path="/featured" element={<FeatureCard  allGoods={allGoods}  setAllGoods={setAllGoods}  allForum={allForum} setAllForum={setAllForum} user={user} />} />
                <Route path="/forums/:id/edit" element={<ForumCard allForum={allForum} setAllForum={setAllForum} />}/>
                <Route path="/users/:user_id/goods/:good_id" element={<EditGoods user={user}  allForum={allForum}/>} />
                <Route path="/users/:user_id/services/:service_id" element={<EditServices user={user} allForum={allForum}/>} />
                <Route path="/users/:user_id/free_stuffs/:free_ stuffs_id" element={<EditFreeStuffs user={user}  allForum={allForum}/>} />

                <Route path="/user-profile"  element={user ? <UserProfile allForum={allForum} handleUpdateFreeStuffs={handleUpdateFreeStuffs} user={user}/> : <Navigate to='/'/>} /> 
                </Routes>
          </div> 
        <div className='footer--pin'>
          <Footer/>
        </div>
    </div>
  );
}
export default App;


          
     

