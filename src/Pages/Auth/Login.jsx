import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Components/Contexts/AuthContext'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    if (username === '' || password === '') {
      setError('Empty fields')
    }

    const data = await login({ username, password })
    if (!data.success) {
      setError('Entered email and/or password are incorrect!')
      setPassword('')
    } else {
      if (data.user.type === 'admin') {
        navigate('/admin-home')
      } else if (data.user.type === 'customer') {
        navigate('/customer-home')
      } else if (data.user.type === 'seller') {
        navigate('/seller-home')
      }
    }
  }

  return (
    <div className='login-container'>
      <div className='login'>
        <div className='login-title'>Login</div>
        {error}
        <form onSubmit={handleLogin}>
          <div className='login-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
          </div>
          <div className='login-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
        <div className='login-register-prompt'>
          Don't have an account? <Link to='/register'>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
