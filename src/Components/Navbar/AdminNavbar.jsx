import React from 'react'
import Navbar from './Navbar'

const AdminNavbar = () => {
  const links = [
    { name: 'Home', href: '/admin-home' },
    { name: 'Orders', href: '/admin-orders' },
    { name: 'Users', href: '/users' },
    { name: 'Profile', href: '/admin-profile' },
  ]
  return <Navbar links={links} />
}

export default AdminNavbar
