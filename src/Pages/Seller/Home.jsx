import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      Seller Home
      <Link to='/seller-orders'>Orders</Link>
      <Link to='/products'>Products</Link>
      <Link to='/add-product'>Add</Link>
    </div>
  )
}

export default Home
