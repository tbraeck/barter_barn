
import React, {useState, useEffect, useContext} from 'react'; 
// import 'bootstrap/dist/css/bootstrap.min.css'
// import {Container, Row} from 'react-bootstrap';
import './main.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import FullPageContainer from './components/FullPageContainer';
import Home from './components/Home';
import Header from './components/Header';
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

  return (
    <div>
    <div className='mainContainer'>
      <FullPageContainer>
      {/* <p>App is Here</p> */}
        <Header />
        <Routes>
            <Route exact path="/" element={<Home /> } />  
            <Route path="/categories" />  
            <Route path="/categories/:id" />
            <Route path="/categories/:id/edit" />
            <Route path="/users/:user_id/drawings/:drawing_id"  />
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
