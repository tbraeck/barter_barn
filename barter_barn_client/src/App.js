
import React, {useState, useEffect, useContext} from 'react'; 
import './main.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './general/Home';
import Header from './general/Header';
import Login from './general/login-components/Login.js';
import Footer from './general/Footer';
import GoodsCard from './general/goods-components/GoodsCard';
import ServicesCard from './general/services-components/ServicesCard';
import FreeStuffCard from './general/FreeStuffCard.js';
import ForumList from './general/forum-components/ForumList';
import FeatureCard from './general/FeatureCard';
import ForumCard from './general/forum-components/ForumCard';
import EditGoods from './general/editing-components/EditGoods';
import EditServices from './general/editing-components/EditServices';
import EditFreeStuffs from './general/editing-components/EditFreeStuff';
import UserProfile from './general/user-info/UserProfile.js';
import { UserContext } from './contexts/UserContext.js';
import { ForumContext } from './contexts/ForumContext.js';

function App() {
  const [allGoods, setAllGoods] = useState([])
  const {user, setUser} = useContext(UserContext);
const {allForum, setAllForum } = useContext(ForumContext)

useEffect(()=> {
      fetch('/goods')
      .then((res)=> res.json())
      .then((data) => setAllGoods(data))
      .catch((error) => console.error('Error fetching goods:', error));
  }, [])

    const handleLogout = ()=> {
      setUser(null)
    }


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
                <Route path="/forums/:id" element={<ForumCard  user={user} setUser={setUser} allForum={allForum} setAllForum={setAllForum}  />} />
                <Route path="/goods/:id" element={<GoodsCard    allForum={allForum} setAllForum={setAllForum}   />}/> 
                <Route path="/services/:id" element={<ServicesCard  allForum={allForum} setAllForum={setAllForum}  />}/> 
                <Route path="/free_stuffs/:id" element={<FreeStuffCard setAllForum={setAllForum} allForum={allForum}  />}/>
                <Route path="/featured" element={<FeatureCard  allGoods={allGoods}  setAllGoods={setAllGoods}  allForum={allForum} setAllForum={setAllForum} user={user} />} />
                <Route path="/forums/:id/edit" element={<ForumCard allForum={allForum} setAllForum={setAllForum} />}/>
                <Route path="/users/:user_id/goods/:good_id" element={<EditGoods user={user}  allForum={allForum}/>} />
                <Route path="/users/:user_id/services/:service_id" element={<EditServices user={user} allForum={allForum}/>} />
                <Route path="/users/:user_id/free_stuffs/:free_ stuffs_id" element={<EditFreeStuffs user={user}  allForum={allForum}/>} />
                <Route path="/user-profile"  element={user ? <UserProfile allForum={allForum}  user={user} setUser={setUser}/> : <Navigate to='/'/>} /> 
                </Routes>
          </div> 
        <div className='footer--pin'>
          <Footer/>
        </div>
    </div>
  );
}
export default App;


          
     

