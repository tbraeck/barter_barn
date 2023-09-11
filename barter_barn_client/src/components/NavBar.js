import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <Link to="/" className='navButton'>
        <button className='button' type='button'>
            Home
        </button>
      </Link>
      <Link to="/user-profile" className='navButton'>
        <button className='button' type='button'>
            User Profile
        </button>
      </Link>
      <Link to="/categories" className='navButton'>
        <button className='button' type='button'>
            Categories
        </button>
      </Link>
      {/* <Link to="/" className='navButton'>Home</Link> */}
    </div>
  )
}

export default NavBar
