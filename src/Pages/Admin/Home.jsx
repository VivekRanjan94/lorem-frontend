import React from 'react'
import { useAuth } from '../../Components/Contexts/AuthContext'

const Home = () => {
  const { logout } = useAuth()
  return <div>Admin Home</div>
}

export default Home
