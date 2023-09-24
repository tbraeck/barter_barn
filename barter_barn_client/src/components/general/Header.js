import React, { useContext } from 'react'; 
import NavBar from './NavBar'
import { UserContext } from '../contexts/UserContext'


const Header = ({handleLogout, userComments, setUserComments}) => {
  const {user, setUser} = useContext(UserContext);

  return (
    <div className="headerCont">
      <img src="/barn.gif" alt="Barter Barn Logo" className="logo" />
      <div className='navbar'>
        <NavBar user={user} setUser={setUser} userComments={userComments} setUserComments={setUserComments} handleLogout={handleLogout} />
      </div>
    </div>
  )
}

export default Header
