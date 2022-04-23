import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../Components/Contexts/UserContext'

const Products = () => {
  const { user } = useUser()
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  const getProducts = async () => {
    try {
      const response = Axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER_URL}/get-products`,
        data: { seller_id: user.id },
      })

      const data = response.data

      if (data.success) {
        setProducts(data.products)
      } else {
        setError('Could not get products')
      }
    } catch (e) {
      setError(e)
      console.error(e)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])
  return <div>Products</div>
}

export default Products
