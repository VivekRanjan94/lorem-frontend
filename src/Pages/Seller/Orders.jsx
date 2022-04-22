import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../Components/Contexts/UserContext'

const Orders = () => {
  const { user } = useUser()

  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  const getOrders = async () => {
    const response = Axios({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_URL}/get-orders`,
      data: { seller_id: user.id },
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
