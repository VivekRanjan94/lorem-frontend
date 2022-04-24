import React from 'react'
import Navbar from './Navbar'

const CustomerNavbar = () => {
  const links = [
    { name: 'Home', href: '/admin-home' },
    { name: 'Cart', href: '/cart' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'Profile', href: '/customer-profile' },
  ]
  return <Navbar links={links} />
}

export default CustomerNavbar
