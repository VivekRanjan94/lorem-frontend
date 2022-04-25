import React from 'react'

const Product = ({
  product,
  canBuy,
  isAdmin,
  cartHandler,
  wishlistHandler,
}) => {
  return (
    <div className='product-list-product'>
      <div className='product-list-product-name'>
        {product.name}{' '}
        <span className='product-list-product-brand'>by {product.brand}</span>
      </div>
      <div className='product-list-product-img'>
        <img src={product.image} alt='product' />
      </div>
      <div className='product-list-product-price-container'>
        <div className='product-list-product-price'>{product.price}</div>
        {canBuy && (
          <div className='product-list-product-buttons'>
            <button
              onClick={() => {
                cartHandler.cartFunction(product.id)
              }}
            >
              {cartHandler.cartTitle}
            </button>
            <button
              onClick={() => {
                wishlistHandler.wishlistFunction(product.id)
              }}
            >
              {wishlistHandler.wishlistTitle}
            </button>
          </div>
        )}
        {isAdmin && (
          <div className='product-list-product-seller'>
            Sold By: {product.first_name} {product.last_name}
          </div>
        )}
      </div>
    </div>
  )
}

export default Product
