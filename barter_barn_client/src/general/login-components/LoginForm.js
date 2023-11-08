import React, {useState} from 'react'


const LoginForm = ({ setUser, user}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault()  

    fetch('/login', {
      method: 'POST',
      headers: {    
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    })
    .then((res) => {
      if (res.ok) {
        res.json().then((user) => 
        setUser(user));
      }
    })
  }
  
  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
        type='username'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='form-input'
        />
        <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='form-input'
        />
        <input
        type='email'
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='form-input'
        />
        <button className='form-button' type='submit'>
          Login
        </button>
      </form>
      {errors && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))}
          </div>
        )}
    </div>
  )
}

export default LoginForm