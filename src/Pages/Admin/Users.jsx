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
        withCredentials: true,
      })

      const data = response.data

      if (data.success) {
        setUsers(data.users)
      } else {
        setError('Could not get users')
      }
    } catch (e) {
      setError(e)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='admin-users'>
      <div className='admin-users-title'>Users</div>
      <table className='admin-users-list'>
        <tr>
          <th>User ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Type</th>
        </tr>
        {users.map((user) => {
          return (
            <tr className='admin-users-list-user'>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.username}</td>
              <td>{user.type}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default Users
