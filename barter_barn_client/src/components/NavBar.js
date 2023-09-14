import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({user, handleLogout}) => {

  const handleLogoutClick = () => {
    fetch("http://localhost:3000/logout", {
      method: "DELETE",
    })
    .then((r)=> {
      if(r.ok){
        handleLogout(null)
      }
    })
  }
console.log(user)
  return (
    <div className='headerBack'>  
      <div className="linkButtons">
      <Link to="/" className='navButton'>
        <button className='button' type='button'>
            HOME
        </button>
      </Link>
      <Link to="/user-profile" className='navButton'>
        <button className='button' type='button'>
            USER PROFILE
        </button>
      </Link>
      <Link to="/categories" className='navButton'>
        <button className='button' type='button'>
            FORUM CATEGORIES
        </button>
      </Link>
      <div className='welcomeLogout'>
          <p>Welcome, !</p>
          <button type='submit' onClick={handleLogoutClick} >LOGOUT</button>
        </div>
      {/* <Link to="/" className='navButton'>Home</Link> */}
    </div>
    </div>
  )
}

export default NavBar
