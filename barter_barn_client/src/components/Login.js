import React, { useState, useContext } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from "./SignUpForm";
import { UserContext } from '../contexts/UserContext';
import '../styles/Login.css'; 

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { setUser } = useContext(UserContext);

  return (
    <div className='login-page'>
    <div className="login-container">
      <h2 className="login-tagline">The Barter Barn</h2>
      <h3 className='login-taglineH3'>Community ~ Bartering ~ Free</h3>
      <div className="login-form-container">
        {showLogin ? (
          <div className='login-form'>
            <LoginForm className="login-form"setUser={setUser} />
            <p className="login-account-question">
              Don't have an account?</p> &nbsp;
            <button className="login-toggle-button" onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </div>
        ) : (
          <div className='login-form'>
            <SignUpForm setUser={setUser} />
            <p className="login-account-question">
              Already have an account?</p> &nbsp;
            <button className="login-toggle-button" onClick={() => setShowLogin(true)}>
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Login;
