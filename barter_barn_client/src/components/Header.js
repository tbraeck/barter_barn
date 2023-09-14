import React, { useContext } from 'react'; 
import NavBar from './NavBar'
import { UserContext } from '../contexts/UserContext'


const Header = ({handleLogout}) => {
  const {user, setUser} = useContext(UserContext);

  return (
    <div className="container">
      <p>Header is here</p>
      <NavBar user={user} setUser={setUser} handleLogout={handleLogout} />
    </div>
  )
}

export default Header
