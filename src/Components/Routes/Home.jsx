import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'

const Home = () => {
  const { user } = useUser()

  if (!user) {
    return <Navigate to='/login' />
  }

  return user.type === 'admin' ? (
    <Navigate to='/admin-home' />
  ) : user.type === 'seller' ? (
    <Navigate to='seller-home' />
  ) : (
    <Navigate to='customer-home' />
  )
}

export default Home
