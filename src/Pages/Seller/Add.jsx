import Axios from 'axios'
import React, { useState } from 'react'
import { useUser } from '../../Components/Contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  const { user } = useUser()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [error, setError] = useState('')

  const handleAdd = async (e) => {
    e.preventDefault()

    if (name === '' || brand === '' || price < 100 || image === '') {
      setError('Empty Fields')
      return
    }

    try {
      const response = await Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/add-product`,
        data: {
          product: {
            name,
            brand,
            price,
            image,
            seller_id: user.id,
          },
        },
      })

      const data = response.data

      if (data.success) {
        navigate('/seller-home')
      } else {
        setError(data.message)
      }
    } catch (e) {
      setError(e)
      console.error(e)
    }
  }

  return (
    <div>
      <div>Add</div>
      <form onSubmit={handleAdd}>
        <div className='group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        <div className='group'>
          <label htmlFor='brand'>Brand</label>
          <input
            type='text'
            name='brand'
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value)
            }}
          />
        </div>
        <div className='group'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            name='price'
            value={price}
            onChange={(e) => {
              setPrice(e.target.value)
            }}
          />
        </div>
        <div className='group'>
          <label htmlFor='image'>Image</label>
          <input
            type='text'
            name='image'
            value={image}
            onChange={(e) => {
              setImage(e.target.value)
            }}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Add
