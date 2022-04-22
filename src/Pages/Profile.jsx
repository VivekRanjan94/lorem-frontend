import React from 'react'
import { useAuth } from '../Components/Contexts/AuthContext'
import { useUser } from '../Components/Contexts/UserContext'

const Profile = () => {
  const { user } = useUser()
  const { logout } = useAuth()

  return (
    <div>
      {user.first_name}
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default Profile
