import React, {useState} from 'react'
import './Login.css'; 

const SignUpForm = ({setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                passwordConfirmation, 
                email
            }),
        })
        .then((r) => {
            setLoading(false);
            if (r.ok) {
                r.json().then((user) => setUser(user))
            } 
        })
    }

  return (
    <div  className='login-container'>
      <div >
    <h2 >Sign Up</h2>
    <form  onSubmit={handleSubmit}>
      <label  htmlFor="username">
        Username
      </label>
      <input
        id="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='form-input'
      />
        <br></br><br></br>

      <label  htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='form-input'

      />

      <label  htmlFor="password_confirmation">
        Password Confirmation
      </label>
      <input
        id="password_confirmation"
        type="password"
        placeholder="Password Confirmation"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        className='form-input'

      />
       <input
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='form-input'

      />

      <button         className='form-button'
type="submit" >
        {loading ? 'Loading...' : 'Sign Up'}
      </button>
      {errors && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))}
          </div>
        )}
    </form>
  </div>
</div>
  )
}

export default SignUpForm
