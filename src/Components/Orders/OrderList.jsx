import React from 'react'
import Order from './Order'

const OrderList = ({ orders }) => {
  return (
    <table className='order-list'>
      <tr>
        <th>Order ID</th>
        <th>Product Name</th>
        <th>Product Brand</th>
        <th>User</th>
      </tr>
      {orders.map((order) => {
        return <Order order={order} />
      })}
    </table>
  )
}

export default OrderList
