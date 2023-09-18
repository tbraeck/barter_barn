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
      <div className="btn ">
      <Link to="/" className='btn '>
        <button className='btn btn-secondary' type='button'>
            HOME
        </button>
      </Link>
      <Link to="/user-profile" className='btn '>
        <button  type='button' className='btn btn-secondary'>
            USER PROFILE
        </button>
      </Link>
      <Link to="/forums" className='btn '>
        <button  type='button' className='btn btn-secondary'>
            FORUMS
        </button>
      </Link>
      <div className='btn '>
          <p>Welcome, {user.username}!</p>
          <button type='submit' onClick={handleLogoutClick} className='btn btn-secondary' >LOGOUT</button>
        </div>
      {/* <Link to="/" className='navButton'>Home</Link> */}
    </div>
    </div>
  )
}

export default NavBar
