import React, {useState} from 'react'


const LoginForm = ({ setUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault()  

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {    
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    })
    .then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
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
    </div>
  )
}

export default LoginForm