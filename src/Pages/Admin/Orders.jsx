import Axios from 'axios'
import React, { useEffect, useState } from 'react'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  const getOrders = async () => {
    const response = await Axios({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_URL}/get-all-orders`,
    })

    const data = response.data

    if (data.success) {
      setOrders(data.orders)
    } else {
      setError('Could not get orders')
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return <div>Orders</div>
}

export default Orders
