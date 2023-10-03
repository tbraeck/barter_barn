
import React, {useState, useEffect, useContext} from 'react'; 
import './main.css';
import {Routes, Route} from 'react-router-dom';
import FreeStuffList from './general/FreeStuffList';
import Home from './general/Home';
import Header from './general/Header';
import Login from './general/Login';
// import ServicesCard from './general/ServicesCard';
import Footer from './general/Footer';
import GoodsCard from './general/GoodsCard';
import UserProfile from './general/UserProfile';
import { UserContext } from './contexts/UserContext';
import EditGoods from './general/EditGoods';
import ForumList from './general/ForumList';
import ForumCard from './general/ForumCard';

function App() {
  const [allForum, setAllForum] = useState([]);
 
  
  // const [userComments, setUserComments] = useState([]);


  const {user, setUser} = useContext(UserContext);


  useEffect(()=> {
    fetch("http://localhost:3000/forums")
      .then((res)=> res.json())
      .then((data) => setAllForum(data))
      .catch((error) => console.error('Error fetching forums:', error));

  }, [])

// const handleSaveCommentsToUserProfile = (comment) => {
//   fetch(`http://localhost:3000/users/${user.id}/comments`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(comment),
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error('Failed to save comment to user profile');
//       }
//     })
//     .then((savedComment) => {
//       setUserComments([...userComments, savedComment]); 
//       handleUpdateSubmit(savedComment); 
//       console.log('Comment saved to user profile:', savedDrawing);
//     })
//     .catch((error) => {
//       console.error('Error saving comment:', error);
//     });
// };

// const handleUpdateSubmit = (_id, updatedDrawing) => {
//   fetch(`http://localhost:3000/users/${user.id}/user_drawings/${drawing_id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updatedDrawing),
//   })
//     .then(r => r.json())
//     .then(savedDrawing => {
//       console.log(savedDrawing)
//       const updatedUserDrawings = userDrawings.map(drawing =>
//         drawing.id === drawingId ? savedDrawing : drawing
//       );
//       setUserDrawings(updatedUserDrawings);
//     });
// };
const handleAddGood = (newGood) => {
    const newGoodArray = [...allForum, newGood]
    setAllForum(newGoodArray)
    }

    const handleLogout = ()=> {
      setUser(null)
    }

    const handleUpdateGoods = (updatedGood) => {
      const editedGood = allForum.goods.map((good) => {
        if (good.id === editedGood.id) {
          return editedGood
        } else {
          return good;
        } 
      });
      setAllForum(editedGood)
    }

    if(!user) return <Login  />
console.log(allForum)
  return (
    <div>
    <div className='mainContainer'>
    <div className="header">
          <Header user={user} setUser={setUser} handleLogout={handleLogout} />
    </div>
      <Routes>
          <Route exact path="/" element={<Home /> } />  
          <Route path="/forums"  element={<ForumList allForum={allForum} setAllForum={setAllForum} /> }/>
          <Route path="/forums/:id" element={<ForumCard allForum={allForum} setAllForum={setAllForum} />} />
          <Route path="/forums/:id/goods" element={<ForumCard allForum={allForum} setAllForum={setAllForum} handleAddGood={handleAddGood} />}/>
          <Route path="/forums/:id/services" element={<ForumCard allForum={allForum} setAllForum={setAllForum} />}/>
          <Route path="/forums/:id/free_stuffs" element={<ForumCard allForum={allForum} setAllForum={setAllForum} />}/>
          <Route path="/goods/:id" element={<GoodsCard  allForum={allForum} setAllForum={setAllForum} />}/>
          {/* <Route path="/services/:id" element={<ServicesCard allServices={allServices} setAllServices={setAllServices} />} /> */}
          <Route path="/free_stuffs/:id"  element={<FreeStuffList  /> }/>
          <Route path="/users/:user_id/goods/:good_id" element={<EditGoods user={user} handleUpdateGoods={handleUpdateGoods} allForum={allForum}/>}/>
          {/* <Route path="/users/:user_id/comments/:comment_id"  /> */}
          <Route path="/user-profile"  element={<UserProfile />} />
      </Routes>
    {/* </div> */}
  </div>
    <div className='footer--pin'>
       <Footer/>
    </div>
    </div>
  );
}

export default App;
