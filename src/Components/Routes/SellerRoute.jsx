import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'
import SellerNavbar from '../Navbar/SellerNavbar'

const SellerRoute = () => {
  const { user } = useUser()

  return !user ? (
    <Navigate to='/login' />
  ) : user.type === 'seller' ? (
    <>
      <SellerNavbar />
      <Outlet />
    </>
  ) : (
    <Navigate to='/' />
  )
}

export default SellerRoute
