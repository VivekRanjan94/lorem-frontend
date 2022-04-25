import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../Components/Contexts/UserContext'
import OrderList from '../../Components/Orders/OrderList'

const Orders = () => {
  const { user } = useUser()

  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  const getOrders = async () => {
    try {
      const response = await Axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER_URL}/get-orders`,
        params: { seller_id: user.id },
        withCredentials: true,
      })

      const data = response.data

      if (data.success) {
        setOrders(data.orders)
      } else {
        setError('Could not get orders')
      }
    } catch (e) {
      setError(e)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div className='seller-orders'>
      <div className='seller-orders-title'>Orders</div>
      <OrderList orders={orders} />
    </div>
  )
}

export default Orders
