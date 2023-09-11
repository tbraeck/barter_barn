
import React, {useState, useEffect, useContext} from 'react'; 
// import 'bootstrap/dist/css/bootstrap.min.css'
// import {Container, Row} from 'react-bootstrap';
import './main.css';
import {Routes, Route} from 'react-router-dom';
import FullPageContainer from './components/FullPageContainer';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Footer from './components/Footer';
import { UserContext } from './contexts/UserContext';



function App() {
  const [allForum, setAllForum] = useState([]);
  const {user, setUser} = useContext(UserContext);


  useEffect(()=> {
    fetch("http://localhost:3000/forums")
      .then((res)=> res.json())
      .then((data) => setAllForum(data))
      .catch((error) => console.error('Error fetching forums:', error));

  }, [])

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
      <FullPageContainer>
      <div className="App">
          <Header handleLogout={handleLogout} />
        </div>
        <Routes>
            <Route exact path="/" element={<Home /> } />  
            <Route path="/forums" allForum={allForum}/>  
            <Route path="/forums/:id" />
            <Route path="/forums/:id/edit" />
            <Route path="/users/:user_id/posts/:post_id"  />
            <Route path="/user-profile"  />
        </Routes>
            <p>Hello There</p>
      </FullPageContainer>
    </div>
    <div className='footer--pin'>
       <Footer/>
    </div>
    </div>
  );
}

export default App;
