import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useAuth } from '../../Components/Contexts/AuthContext'
import ProductList from '../../Components/Products/ProductList'

const Home = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  const getProducts = async () => {
    try {
      const response = await Axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER_URL}/get-all-products`,
        withCredentials: true,
      })

      const data = response.data

      if (data.success) {
        setProducts(data.products)
      } else {
        setError(data.message)
      }
    } catch (e) {
      setError(e)
      console.error(e)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='admin-home'>
      <div className='admin-home-title'>Home</div>
      <div className='admin-home-list'>
        <ProductList products={products} />
      </div>
    </div>
  )
}

export default Home
