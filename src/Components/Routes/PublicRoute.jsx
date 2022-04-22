import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'

const PublicRoute = () => {
  const { user } = useUser()

  return user ? <Navigate to='/' /> : <Outlet />
}

export default PublicRoute
