import Axios from 'axios'
import React, { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  const getUsers = async () => {
    try {
      const response = await Axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER_URL}/get-users`,
      })

      const data = response.data

      if (data.success) {
        setUsers(data.users)
      } else {
        setError('Could not get users')
      }
    } catch (e) {
      setError(e)
      console.error(e)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return <div>Users</div>
}

export default Users