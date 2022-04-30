import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../Components/Contexts/UserContext'
import Modal from '../../Components/Modal/Modal'
import StatusModal from '../../Components/Modal/StatusModal'
import ProductList from '../../Components/Products/ProductList'

const Wishlist = () => {
  const { user } = useUser()

  const [wishlist, setWishlist] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [status, setStatus] = useState({})

  const getWishlist = async () => {
    try {
      const response = await Axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER_URL}/get-wishlist`,
        params: { user_id: user.id },
        withCredentials: true,
      })

      const data = response.data

      if (!data.success) {
        setStatus({ state: 'error', message: 'Could not get Wishlist' })
        setShowModal(true)
      } else {
        setWishlist(data.wishlist)
      }
    } catch (e) {
      setStatus({ state: 'error', message: 'Could not get Wishlist' })
      setShowModal(true)
    }
  }

  useEffect(() => {
    getWishlist()
  }, [])

  const moveToCart = async (product_id) => {
    try {
      const response = await Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/move-to-cart`,
        data: { product_id, user_id: user.id },
        withCredentials: true,
      })

      const data = response.data

      if (!data.success) {
        setStatus({ state: 'error', message: data.message })
      } else {
        setStatus({ state: 'success', message: 'Moved to Cart' })
        getWishlist()
      }
    } catch (e) {
      setStatus({ state: 'error', message: e.response.data.message })
    } finally {
      setShowModal(true)
    }
  }

  const deleteFromWishlist = async (product_id) => {
    try {
      const response = await Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/delete-from-wishlist`,
        data: { product_id, user_id: user.id },
        withCredentials: true,
      })

      const data = response.data

      if (!data.success) {
        setStatus({ state: 'error', message: data.message })
      } else {
        setStatus({ state: 'success', message: 'Deleted from Wishlist' })
        getWishlist()
      }
    } catch (e) {
      setStatus({ state: 'error', message: e.response.data.message })
    } finally {
      setShowModal(true)
    }
  }

  return (
    <div className='customer-wishlist'>
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
      <div className='customer-wishlist-title'>Wishlist</div>
      <div className='customer-wishlist-list'>
        <ProductList
          products={wishlist}
          cartHandler={{ cartTitle: 'Move to Cart', cartFunction: moveToCart }}
          wishlistHandler={{
            wishlistTitle: 'Delete',
            wishlistFunction: deleteFromWishlist,
          }}
        />
      </div>
    </div>
  )
}

export default Wishlist
