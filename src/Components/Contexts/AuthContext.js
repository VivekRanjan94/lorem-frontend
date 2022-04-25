import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useUser } from './UserContext'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const { setUser, user, setLoading } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    defaultLogin()
    // eslint-disable-next-line
  }, [])

  const login = async ({ username, password }) => {
    try {
      const response = await axios({
        method: 'POST',
        data: {
          username,
          password,
        },
        url: `${process.env.REACT_APP_SERVER_URL}/login`,
        withCredentials: true,
      })

      const data = response.data

      if (data.success) {
        setUser({ ...data.user })
        return { success: true, user: data.user }
      } else {
        return { error: !data.success, message: data.message }
      }
    } catch (err) {
      return { error: true, message: 'Could not connect to the server' }
    }
  }
  const register = async ({
    username,
    password,
    first_name,
    last_name,
    type,
  }) => {
    try {
      const response = await axios({
        method: 'POST',
        data: {
          username,
          password,
          first_name,
          last_name,
          type,
        },
        url: `${process.env.REACT_APP_SERVER_URL}/register`,
        withCredentials: true,
      })

      const data = response.data

      if (data.success) {
        return { success: true }
      } else {
        return { success: false, message: data.message }
      }
    } catch (err) {
      return { success: false, message: 'Could not connect to the server' }
    }
  }

  const logout = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/logout`,
        withCredentials: true,
      })

      const { data } = response
      if (data.success) {
        setUser(undefined)
        navigate('/login')
      } else {
        return data.message
      }
    } catch (e) {
      return e.response.data.message
    }
  }

  const defaultLogin = async () => {
    if (user !== undefined) {
      return
    }
    try {
      const response = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER_URL}/user`,
        withCredentials: true,
      })

      const data = response.data
      if (data.success) {
        setUser(data.user)
      }
    } catch (er) {
      return er
    }

    setLoading(false)
  }

  const value = { login, logout, register }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
