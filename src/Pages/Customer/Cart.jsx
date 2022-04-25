import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../Components/Contexts/UserContext'
import ProductList from '../../Components/Products/ProductList'

const Cart = () => {
  const { user } = useUser()

  const [cart, setCart] = useState([])
  const [error, setError] = useState('')

  const getCart = async () => {
    try {
      const response = await Axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER_URL}/get-cart`,
        params: { user_id: user.id },
        withCredentials: true,
      })

      const data = response.data

      if (data.success) {
        setCart(data.cart)
      } else {
        setError('Could not get cart')
      }
    } catch (e) {
      setError(e.response.data.message)
      console.error(e.response.data.message)
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  const deleteFromCart = async (product_id) => {
    try {
      const response = await Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/delete-from-cart`,
        data: { product_id, user_id: user.id },
        withCredentials: true,
      })

      const data = response.data

      if (data.success) {
        getCart()
      } else {
        setError(data.message)
      }
    } catch (e) {
      setError(e.response.data.message)
      console.error(e.response.data.message)
    }
  }

  const moveToWishlist = async (product_id) => {
    try {
      const response = await Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/move-to-wishlist`,
        data: { product_id, user_id: user.id },
        withCredentials: true,
      })

      const data = response.data

      if (data.success) {
        getCart()
      } else {
        setError(data.message)
      }
    } catch (e) {
      setError(e.response.data.message)
      console.error(e.response.data.message)
    }
  }

  return (
    <div className='customer-cart'>
      <div className='customer-cart-title'>Cart</div>
      <div className='customer-cart-error'>{error}</div>
      <div className='customer-cart-list'>
        <ProductList
          products={cart}
          cartHandler={{ cartTitle: 'Delete', cartFunction: deleteFromCart }}
          wishlistHandler={{
            wishlistTitle: 'Move To Wishlist',
            wishlistFunction: moveToWishlist,
          }}
        />
      </div>
    </div>
  )
}

export default Cart
