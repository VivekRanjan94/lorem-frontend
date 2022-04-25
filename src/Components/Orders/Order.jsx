import React from 'react'

const Order = ({ order }) => {
  return (
    <tr className='order-list-order'>
      <td>{order.order_id}</td>
      <td>{order.product_name}</td>
      <td>{order.product_brand}</td>
      <td>
        {order.user_first_name} {order.user_last_name} ({order.user_username})
      </td>
    </tr>
  )
}

export default Order
