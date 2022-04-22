import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'

const CustomerRoute = () => {
  const { user } = useUser()

  return !user ? (
    <Navigate to='/login' />
  ) : user.type === 'customer' ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  )
}

export default CustomerRoute
