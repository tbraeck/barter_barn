import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({user, handleLogout}) => {

  const handleLogoutClick = () => {
    fetch("/logout", {
      method: "DELETE",
    })
    .then((r)=> {
      if(r.ok){
        handleLogout(null)
      }
    })
  }

  return (
    <div className='headerBack'>  
      <div className="btn ">
      <Link to="/" className='btn '>
        <button className='btn btn-secondary' type='button'>
            HOME
        </button>
      </Link>
     
      <Link to="/forums" className='btn '>
        <button  type='button' className='btn btn-secondary'>
            THINGS TO BARTER
        </button>
      </Link>
      <Link to="/featured" className='btn '>
        <button  type='button' className='btn btn-secondary'>
             DAILY FEATURED  
        </button>
      </Link>
      <Link to="/user-profile" className='btn '>
        <button  type='button' className='btn btn-secondary'>
            USER PROFILE
        </button>
      </Link>
    
      <div className='btn '>
          <p className='welcomeText'>Welcome, {user.username}!</p>
          <button type='submit' onClick={handleLogoutClick} className='btn btn-secondary' >LOGOUT</button>
      </div>
    </div>
  </div>
  )
}

export default NavBar
