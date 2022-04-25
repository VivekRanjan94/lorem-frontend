import React from 'react'
import Product from './Product'

const ProductList = ({
  products,
  canBuy = false,
  cartHandler,
  wishlistHandler,
}) => {
  return (
    <div className='product-list'>
      {products.map((product) => {
        return (
          <Product
            product={product}
            canBuy={canBuy}
            cartHandler={cartHandler}
            wishlistHandler={wishlistHandler}
          />
        )
      })}
    </div>
  )
}

export default ProductList
