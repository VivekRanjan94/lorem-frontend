import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Components/Contexts/AuthContext'

const Home = () => {
  const { logout } = useAuth()

  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  const getProducts = async () => {
    try {
      const response = await Axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER_URL}/get-all-products`,
        withCredentials: true,
      })

      const data = response.data

      if (data.success) {
        setProducts(data.products)
      } else {
        setError(data.message)
      }
    } catch (e) {
      setError(e)
      console.error(e)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='customer-home'>
      <div>Customer Home</div>
      <Link to='/cart'>Cart</Link>
      <Link to='/wishlist'>Wishlist</Link>
      <button onClick={logout}>logout</button>
      {products.length > 0 &&
        products.map((product) => {
          return <div>{product.name}</div>
        })}
    </div>
  )
}

export default Home
