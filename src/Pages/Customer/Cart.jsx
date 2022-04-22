import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../Components/Contexts/UserContext'

const Cart = () => {
  const { user } = useUser()

  const [cart, setCart] = useState([])
  const [error, setError] = useState('')

  const getCart = async () => {
    const response = Axios({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_URL}/get-cart`,
      data: { user_id: user.id },
    })

    const data = response.data

    if (data.success) {
      setCart(data.cart)
    } else {
      setError('Could not get cart')
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  return <div>Cart</div>
}

export default Cart
