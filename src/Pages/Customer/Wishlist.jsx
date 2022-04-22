import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../Components/Contexts/UserContext'

const Wishlist = () => {
  const { user } = useUser()

  const [wishlist, setWishlist] = useState([])
  const [error, setError] = useState('')

  const getWishlist = async () => {
    const response = Axios({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_URL}/get-wishlist`,
      data: { user_id: user.id },
    })

    const data = response.data

    if (data.success) {
      setWishlist(data.wishlist)
    } else {
      setError('Could not get wishlist')
    }
  }

  useEffect(() => {
    getWishlist()
  }, [])

  return <div>Wishlist</div>
}

export default Wishlist
