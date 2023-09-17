import React, { useContext } from 'react'; 
import NavBar from './NavBar'
import { UserContext } from '../contexts/UserContext'


const Header = ({handleLogout}) => {
  const {user, setUser} = useContext(UserContext);

  return (
    <div className="headerCont">
      <img src="/barn.gif" alt="Barter Barn Logo" className="logo" />
      <div className='navbar'>
        <NavBar user={user} setUser={setUser} handleLogout={handleLogout} />
      </div>
    </div>
  )
}

export default Header
