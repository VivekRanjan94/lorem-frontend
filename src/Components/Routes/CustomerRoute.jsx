import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'
import CustomerNavbar from '../Navbar/CustomerNavbar'

const CustomerRoute = () => {
  const { user } = useUser()

  return !user ? (
    <Navigate to='/login' />
  ) : user.type === 'customer' ? (
    <>
      <CustomerNavbar />
      <Outlet />
    </>
  ) : (
    <Navigate to='/' />
  )
}

export default CustomerRoute
