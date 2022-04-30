import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../Components/Contexts/AuthContext'

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [type, setType] = useState('customer')
  const [error, setError] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    // console.log({
    //   username,
    //   password,
    //   confirmPassword,
    //   type,
    //   firstName,
    //   lastName,
    // })

    if (
      username === '' ||
      password === '' ||
      confirmPassword === '' ||
      firstName === '' ||
      lastName === ''
    ) {
      setError('Empty fields')
      return
    }

    if (username.length >= 45) {
      setError('Username too long')
      return
    }

    if (password.length >= 45) {
      setError('Password too long')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const data = await register({
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      type,
    })

    if (data.success) {
      navigate('/login')
    } else {
      setError(data.message)
    }
  }

  return (
    <div className='register-container'>
      <div className='register'>
        <div className='register-title'>Register</div>
        {error}
        <form onSubmit={handleRegister}>
          <div className='register-group'>
            <div className='register-group-title'>
              <label htmlFor='username'>Username</label>
            </div>
            <input
              type='text'
              name='username'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
          </div>
          <div className='register-group'>
            <div className='register-group-title'>
              <label htmlFor='firstName'>First Name</label>
            </div>
            <input
              type='text'
              name='firstName'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />
          </div>
          <div className='register-group'>
            <div className='register-group-title'>
              <label htmlFor='lastName'>Last Name</label>
            </div>
            <input
              type='text'
              name='lastName'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            />
          </div>
          <div className='register-group'>
            <div className='register-group-title'>
              <label htmlFor='password'>Password</label>
            </div>
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <div className='register-group'>
            <div className='register-group-title'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
            </div>
            <input
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
            />
          </div>
          <div className='register-group'>
            <div className='register-group-title'>
              <label htmlFor='type'>Type of User</label>
            </div>
            <select
              name='type'
              value={type}
              onChange={(e) => {
                setType(e.target.value)
              }}
            >
              <option value='customer'>Customer</option>
              <option value='seller'>Seller</option>
            </select>
          </div>
          <div className='register-button-container'>
            <button type='submit'>Register</button>
          </div>
        </form>
        <div className='prompt'>
          Already have an account? <Link to='/login'>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
