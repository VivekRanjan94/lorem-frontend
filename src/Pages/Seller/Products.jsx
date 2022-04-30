import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../Components/Contexts/UserContext'
import ProductList from '../../Components/Products/ProductList'

const Products = () => {
  const { user } = useUser()
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  const getProducts = async () => {
    try {
      const response = await Axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER_URL}/get-products`,
        params: { seller_id: user.id },
        withCredentials: true,
      })

      const data = response.data

      if (data.success) {
        setProducts(data.products)
      } else {
        setError('Could not get products')
      }
    } catch (e) {
      setError(e)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='seller-products'>
      <div className='seller-products-title'>My Products</div>
      <div className='seller-products-list'>
        <ProductList products={products} showNumber={true} />
      </div>
    </div>
  )
}

export default Products
