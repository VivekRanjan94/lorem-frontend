import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../Components/Contexts/UserContext'
import Modal from '../../Components/Modal/Modal'
import StatusModal from '../../Components/Modal/StatusModal'
import ProductList from '../../Components/Products/ProductList'

const Cart = () => {
  const { user } = useUser()

  const [cart, setCart] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [status, setStatus] = useState({})

  const getCart = async () => {
    try {
      const response = await Axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER_URL}/get-cart`,
        params: { user_id: user.id },
        withCredentials: true,
      })

      const data = response.data

      if (!data.success) {
        setStatus({ state: 'error', message: 'Could not get Cart' })
        setShowModal(true)
      } else {
        setCart(data.cart)
      }
    } catch (e) {
      setStatus({ state: 'error', message: 'Could not get Cart' })
      setShowModal(true)
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  const deleteFromCart = async (product_id) => {
    try {
      const response = await Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/delete-from-cart`,
        data: { product_id, user_id: user.id },
        withCredentials: true,
      })

      const data = response.data

      if (!data.success) {
        setStatus({ state: 'error', message: data.message })
      } else {
        setStatus({ state: 'success', message: 'Deleted from Cart' })
        getCart()
      }
    } catch (e) {
      setStatus({ state: 'error', message: e.response.data.message })
    } finally {
      setShowModal(true)
    }
  }

  const moveToWishlist = async (product_id) => {
    try {
      const response = await Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/move-to-wishlist`,
        data: { product_id, user_id: user.id },
        withCredentials: true,
      })

      const data = response.data

      if (!data.success) {
        setStatus({ state: 'error', message: data.message })
      } else {
        setStatus({ state: 'success', message: 'Moved to Wishlist' })
        getCart()
      }
    } catch (e) {
      setStatus({ state: 'error', message: e.response.data.message })
    } finally {
      setShowModal(true)
    }
  }

  const handleCheckout = async () => {
    try {
      const { data } = await Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/checkout`,
        withCredentials: true,
      })

      if (!data.success) {
        setStatus({ state: 'error', message: 'Could not place order' })
      } else {
        setStatus({ state: 'success', message: 'Order Placed Successfully' })
        getCart()
      }
    } catch (e) {
      setStatus({ state: 'error', message: 'Could not place order' })
    } finally {
      setShowModal(true)
    }
  }

  return (
    <div className='customer-cart'>
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
      <div className='customer-cart-title'>Cart</div>
      <div className='customer-cart-list'>
        <ProductList
          products={cart}
          cartHandler={{ cartTitle: 'Delete', cartFunction: deleteFromCart }}
          wishlistHandler={{
            wishlistTitle: 'Move To Wishlist',
            wishlistFunction: moveToWishlist,
          }}
        />
      </div>
      {cart.length > 0 && (
        <div className='customer-cart-checkout'>
          <button
            onClick={handleCheckout}
            className='customer-cart-checkout-btn'
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
