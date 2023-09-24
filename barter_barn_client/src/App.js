
import React, {useState, useEffect, useContext} from 'react'; 
import './main.css';
import {Routes, Route} from 'react-router-dom';
import FullPageContainer from './components/FullPageContainer';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import SavedContent from './components/SavedContent';
import Footer from './components/general/Footer';
import GoodsCard from './components/GoodsCard';
import ServicesCard from './components/ServicesCard'; 
import { UserContext } from './contexts/UserContext';
import FreeStuffList from './components/FreeStuffCard';


function App() {
  const [allForum, setAllForum] = useState([]);
  const [allGoods, setAllGoods] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [allFreeStuff, setAllFreeStuff] = useState([]);
  
  // const [userComments, setUserComments] = useState([]);


  const {user, setUser} = useContext(UserContext);


  useEffect(()=> {
    fetch("http://localhost:3000/forums")
      .then((res)=> res.json())
      .then((data) => setAllForum(data))
      .catch((error) => console.error('Error fetching forums:', error));

  }, [])

  useEffect(()=> {
    fetch("http://localhost:3000/goods")
      .then((res)=> res.json())
      .then((data) => setAllGoods(data))
      .catch((error) => console.error('Error fetching goods:', error));

  }, [])

useEffect(()=> {
  fetch("http://localhost:3000/services")
    .then((res)=> res.json())
    .then((data) => setAllServices(data))
    .catch((error) => console.error('Error fetching services:', error));

}, [])

useEffect(()=> {
  fetch("http://localhost:3000/free_stuffs")
    .then((res)=> res.json())
    .then((data) => setAllFreeStuff(data))
    .catch((error) => console.error('Error fetching free stuff:', error));

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
// const handleAdd = (newPost) => {
  //   const newPostArray = [...allForum, newPost]
  //   setAllForum(newPostArray)
  //   }

    const handleLogout = ()=> {
      setUser(null)
    }

    // const handleUpdatePosts = (updatedPost) => {
    //   const editedPost = allForum.posts.map((post) => {
    //     if (post.id === editedPost.id) {
    //       return editedPost
    //     } else {
    //       return post;
    //     } 
    //   });
    //   setAllForum(editedPost)
    // }

    if(!user) return <Login  />

  return (
    <div>
    <div className='mainContainer'>
    <div className="header">
          <Header user={user} setUser={setUser} handleLogout={handleLogout} />
    </div>
      <Routes>
          <Route exact path="/" element={<Home /> } />  
          <Route path="/forums"  element={<FullPageContainer allForum={allForum} setAllForum={setAllForum} allGoods={allGoods} setAllGoods={setAllGoods} allServices={allServices} setAllServices={setAllServices} allFreeStuff={allFreeStuff} setAllFreeStuff={setAllFreeStuff}/> }/>
          {/* <Route path="/forums/:id" element={<ForumCard allForum={allForum} setAllForum={setAllForum} />}/> */}
          <Route path="/goods/:id" element={<GoodsCard allGoods={allGoods} setAllGoods={setAllGoods} />}/>
          <Route path="/services/:id" element={<ServicesCard allServices={allServices} setAllServices={setAllServices} />}/>
          <Route path="/free_stuffs"  element={<FreeStuffList allFreeStuff={allFreeStuff} setAllFreeStuff={setAllFreeStuff} /> }/>
          <Route path="/forums/:id/edit" />
          <Route path="/users/:user_id/comments/:comment_id"  />
          <Route path="/user-profile"  element={<SavedContent />} />
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
