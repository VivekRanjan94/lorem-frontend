import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'
import AdminNavbar from '../Navbar/AdminNavbar'

const AdminRoute = () => {
  const { user } = useUser()

  return !user ? (
    <Navigate to='/login' />
  ) : user.type === 'admin' ? (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  ) : (
    <Navigate to='/' />
  )
}

export default AdminRoute
