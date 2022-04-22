import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'

const SellerRoute = () => {
  const { user } = useUser()

  return !user ? (
    <Navigate to='/login' />
  ) : user.type === 'seller' ? (
    <Outlet />
  ) : (
    <Navigate to='/profile' />
  )
}

export default SellerRoute
