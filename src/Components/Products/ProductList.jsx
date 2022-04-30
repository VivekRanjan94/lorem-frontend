import React from 'react'
import { useUser } from '../Contexts/UserContext'
import Product from './Product'

const ProductList = ({
  products,
  cartHandler,
  wishlistHandler,
  showNumber,
}) => {
  const { user } = useUser()

  return (
    <div className='product-list'>
      {products.map((product) => {
        return (
          <Product
            key={Math.random()}
            product={product}
            canBuy={user.type === 'customer'}
            isAdmin={user.type === 'admin'}
            showNumber={showNumber}
            cartHandler={cartHandler}
            wishlistHandler={wishlistHandler}
          />
        )
      })}
    </div>
  )
}

export default ProductList
