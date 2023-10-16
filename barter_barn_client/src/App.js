
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
import CommentCard from './general/comment-components/CommentCard';
import UserProfile from './general/user-info/UserProfile.js';
import { UserContext } from './contexts/UserContext';

function App() {
  const [allForum, setAllForum] = useState([]);
  const [allGoods, setAllGoods] = useState([])
  const [allServices, setAllServices] = useState([])
  const [allFreeStuffs, setAllFreeStuffs] = useState([])
  const [allComments, setAllComments] = useState([])



  // const [userComments, setUserComments] = useState([]);
  const {user, setUser} = useContext(UserContext);

  useEffect(()=> {
    fetch("http://localhost:3000/forums")
      .then((res)=> res.json())
      .then((data) => setAllForum(data))
      .catch((error) => console.error('Error fetching forums:', error));

      fetch("http://localhost:3000/goods")
      .then((res)=> res.json())
      .then((data) => setAllGoods(data))
      .catch((error) => console.error('Error fetching forums:', error));

      fetch("http://localhost:3000/services")
      .then((res)=> res.json())
      .then((data) => setAllServices(data))
      .catch((error) => console.error('Error fetching forums:', error));

      fetch("http://localhost:3000/free_stuffs")
      .then((res)=> res.json())
      .then((data) => setAllFreeStuffs(data))
      .catch((error) => console.error('Error fetching forums:', error));
      
      fetch("http://localhost:3000/comments")
      .then((res)=> res.json())
      .then((data) => setAllComments(data))
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

    const handleAddService = (newService) => {
      const newServiceArray = [...allForum, newService]
      setAllForum(newServiceArray)
      }

  const handleAddFreeStuffs = (newStuff) => {
        const newFreeStuffArray = [...allForum, newStuff]
        setAllForum(newFreeStuffArray)
        }


  const handleAddComments = (newComment) => {
    const newCommentArray = [...allForum, newComment]
    setAllComments(newCommentArray)
    }

    const handleLogout = ()=> {
      setUser(null)
    }

    const handleUpdateGoods = (updatedGood) => {
      const editedGood = allGoods.map((good) => {
        if (good.id === updatedGood.id) {
          return editedGood
        } else {
          return good;
        } 
      });
      setAllForum(editedGood)
    }

    const handleUpdateServices = (updatedService) => {
      const editedService = allServices.map((service) => {
        if (service.id === updatedService.id) {
          return editedService
        } else {
          return service;
        } 
      });
      setAllForum(editedService)
    }

    const handleUpdateFreeStuffs = (updatedFreeStuff) => {
      const editedFreeStuff = allFreeStuffs.map((stuff) => {
        if (stuff.id === updatedFreeStuff.id) {
          return editedFreeStuff
        } else {
          return stuff;
        } 
      });
      setAllForum(editedFreeStuff)
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
                <Route path="/forums/:id" element={<ForumCard    allForum={allForum} setAllForum={setAllForum} />} />
                <Route path="/goods/:id" element={<GoodsCard  allForum={allForum} setAllForum={setAllForum} handleAddGood={handleAddGood} allComments={allComments} setAllComments={setAllComments}/>}/> 
                <Route path="/services/:id" element={<ServicesCard allForum={allForum} setAllForum={setAllForum} handleAddService={handleAddService} />}/> 
                <Route path="/free_stuffs/:id" element={<FreeStuffCard allForum={allForum} setAllForum={setAllForum} handleAddFreeStuffs={handleAddFreeStuffs} />}/>
                <Route path="/comments/:id" element={<CommentCard allForum={allForum} setAllForum={setAllForum} handleAddComments={handleAddComments} allComments/>}/> 
                <Route path="/featured" element={<FeatureCard  allGoods={allGoods}  setAllGoods={setAllGoods}  allForum={allForum} setAllForum={setAllForum}/>} />
                <Route path="/forums/:id/edit" element={<ForumCard allForum={allForum} setAllForum={setAllForum} handleAddGood={handleAddGood}/>}/>
                <Route path="/users/:user_id/goods/:good_id" element={<EditGoods user={user} handleUpdateGoods={handleUpdateGoods } allForum={allForum}/>} />
                <Route path="/users/:user_id/services/:service_id" element={<EditServices user={user} handleUpdateServices={handleUpdateServices } allForum={allForum}/>} />
                <Route path="/users/:user_id/free_stuffs/:free_stuffs_id" element={<EditFreeStuffs user={user} handleUpdateFreeStuffs={handleUpdateFreeStuffs } allForum={allForum}/>} />

                <Route path="/user-profile"  element={user ? <UserProfile user={user}/> : <Navigate to='/'/>} /> 
                </Routes>
          </div> 
        <div className='footer--pin'>
          <Footer/>
        </div>
    </div>
  );
}
export default App;


          
     

