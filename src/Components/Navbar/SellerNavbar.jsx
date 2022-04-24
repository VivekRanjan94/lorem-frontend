import React from 'react'
import Navbar from './Navbar'

const SellerNavbar = () => {
  const links = [
    { name: 'Home', href: '/admin-home' },
    { name: 'Orders', href: '/seller-orders' },
    { name: 'Add Product', href: '/add-product' },
    { name: 'Products', href: '/products' },
    { name: 'Profile', href: '/seller-profile' },
  ]
  return <Navbar links={links} />
}

export default SellerNavbar
