import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../Components/Contexts/UserContext'
import Modal from '../../Components/Modal/Modal'
import StatusModal from '../../Components/Modal/StatusModal'
import ProductList from '../../Components/Products/ProductList'

const Home = () => {
  const { user } = useUser()

  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [status, setStatus] = useState({})

  const getProducts = async () => {
    try {
      const response = await Axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER_URL}/get-all-products`,
        withCredentials: true,
      })

      const data = response.data

      if (!data.success) {
        setStatus({ state: 'error', message: data.message })
        setShowModal(true)
      } else {
        setProducts(data.products)
      }
    } catch (e) {
      setStatus({ state: 'error', message: e.response.data.message })
      setShowModal(true)
    }
  }

  const addToCart = async (product_id) => {
    try {
      const response = await Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/add-to-cart`,
        data: { user_id: user.id, product_id },
        withCredentials: true,
      })

      const data = response.data

      if (!data.success) {
        setStatus({ state: 'error', message: data.message })
      } else {
        setStatus({ state: 'success', message: 'Added to Cart' })
      }
    } catch (e) {
      setStatus({ state: 'error', message: e.response.data.message })
    } finally {
      setShowModal(true)
    }
  }

  const addToWishlist = async (product_id) => {
    try {
      const response = await Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/add-to-wishlist`,
        data: { user_id: user.id, product_id },
        withCredentials: true,
      })

      const data = response.data

      if (!data.success) {
        setStatus({ state: 'error', message: data.message })
      } else {
        setStatus({ state: 'success', message: 'Added to Wishlist' })
      }
    } catch (e) {
      setStatus({ state: 'error', message: e.response.data.message })
    } finally {
      setShowModal(true)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='customer-home'>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        allowClose={true}
      >
        <StatusModal
          setShowModal={setShowModal}
          message={status.message}
          type={status.state}
        />
      </Modal>
      <div className='customer-home-title'>Home</div>
      <div className='customer-home-list'>
        <ProductList
          products={products}
          cartHandler={{ cartTitle: 'Add to Cart', cartFunction: addToCart }}
          wishlistHandler={{
            wishlistTitle: 'Add to Wishlist',
            wishlistFunction: addToWishlist,
          }}
        />
      </div>
    </div>
  )
}

export default Home
