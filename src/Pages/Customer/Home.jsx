import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../Components/Contexts/UserContext'
import ProductList from '../../Components/Products/ProductList'

const Home = () => {
  const { user } = useUser()

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
      setError('Could not get Products')
    }
  }

  const addToCart = async (product_id) => {
    try {
      const response = await Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/add-to-cart`,
        data: { user_id: user.id, product_id },
        withCredentials: true,
      })

      const data = response.data

      if (data.success) {
      } else {
        setError(data.message)
      }
    } catch (e) {
      setError(e.response.data.message)
    }
  }

  const addToWishlist = async (product_id) => {
    try {
      const response = await Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/add-to-wishlist`,
        data: { user_id: user.id, product_id },
        withCredentials: true,
      })

      const data = response.data

      if (!data.success) {
        setError(data.message)
      }
    } catch (e) {
      setError(e.response.data.message)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='customer-home'>
      <div className='customer-home-title'>Home</div>
      <div className='customer-home-error'>{error}</div>
      <div className='customer-home-list'>
        <ProductList
          products={products}
          cartHandler={{ cartTitle: 'Add to Cart', cartFunction: addToCart }}
          wishlistHandler={{
            wishlistTitle: 'Add to Wishlist',
            wishlistFunction: addToWishlist,
          }}
        />
      </div>
    </div>
  )
}

export default Home
