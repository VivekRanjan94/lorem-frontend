import React from 'react'
import { useAuth } from '../Components/Contexts/AuthContext'
import { useUser } from '../Components/Contexts/UserContext'

const Profile = () => {
  const { user } = useUser()
  const { logout } = useAuth()

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className='profile'>
      <div className='profile-details'>
        <div className='profile-details-detail'>
          Username:{' '}
          <div className='profile-details-detail-value'>{user.username}</div>
        </div>
        <div className='profile-details-detail'>
          First Name:{' '}
          <div className='profile-details-detail-value'>{user.first_name}</div>
        </div>
        <div className='profile-details-detail'>
          Last Name:{' '}
          <div className='profile-details-detail-value'>{user.last_name}</div>
        </div>
        <div className='profile-details-detail'>
          Type:{' '}
          <div className='profile-details-detail-value'>
            {capitalize(user.type)}
          </div>
        </div>
      </div>
      <button onClick={logout}>Log Out</button>
    </div>
  )
}

export default Profile
