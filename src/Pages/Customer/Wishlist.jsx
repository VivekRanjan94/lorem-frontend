import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../Components/Contexts/UserContext'
import ProductList from '../../Components/Products/ProductList'

const Wishlist = () => {
  const { user } = useUser()

  const [wishlist, setWishlist] = useState([])
  const [error, setError] = useState('')

  const getWishlist = async () => {
    try {
      const response = await Axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER_URL}/get-wishlist`,
        params: { user_id: user.id },
        withCredentials: true,
      })

      const data = response.data

      if (data.success) {
        setWishlist(data.wishlist)
      } else {
        setError('Could not get wishlist')
      }
    } catch (e) {
      setError(e)
      console.error(e)
    }
  }

  useEffect(() => {
    getWishlist()
  }, [])

  const moveToCart = async (product_id) => {
    try {
      const response = await Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/move-to-cart`,
        data: { product_id, user_id: user.id },
        withCredentials: true,
      })

      const data = response.data

      if (data.success) {
        getWishlist()
      } else {
        setError(data.message)
      }
    } catch (e) {
      setError(e.response.data.message)
      console.error(e.response.data.message)
    }
  }

  const deleteFromWishlist = async (product_id) => {
    try {
      const response = await Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/delete-from-wishlist`,
        data: { product_id, user_id: user.id },
        withCredentials: true,
      })

      const data = response.data

      if (data.success) {
        getWishlist()
      } else {
        setError(data.message)
      }
    } catch (e) {
      setError(e.response.data.message)
      console.error(e.response.data.message)
    }
  }

  return (
    <div className='customer-wishlist'>
      <div className='customer-wishlist-title'>Wishlist</div>
      <div className='customer-wishlist-error'>{error}</div>
      <div className='customer-wishlist-list'>
        <ProductList
          products={wishlist}
          cartHandler={{ cartTitle: 'Move to Cart', cartFunction: moveToCart }}
          wishlistHandler={{
            wishlistTitle: 'Delete',
            wishlistFunction: deleteFromWishlist,
          }}
        />
      </div>
    </div>
  )
}

export default Wishlist
