import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Components/Contexts/AuthContext'

const Home = () => {
  const { logout } = useAuth()
  return (
    <div>
      Admin Home
      <button onClick={logout}>logout</button>
      <Link to='/admin-orders'>Orders</Link>
      <Link to='/users'>Users</Link>
    </div>
  )
}

export default Home
