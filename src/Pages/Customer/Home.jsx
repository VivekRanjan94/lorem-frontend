import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      Customer Home
      <Link to='/cart'>Cart</Link>
      <Link to='/wishlist'>Wishlist</Link>
    </div>
  )
}

export default Home
