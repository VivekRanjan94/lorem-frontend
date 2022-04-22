import React from 'react'
import { useUser } from '../Components/Contexts/UserContext'

const Profile = () => {
  const { user } = useUser()
  return <div>{user.first_name}</div>
}

export default Profile
