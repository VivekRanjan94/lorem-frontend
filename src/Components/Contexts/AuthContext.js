import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useUser } from './UserContext'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const { setUser, user, setLoading } = useUser()

  useEffect(() => {
    defaultLogin()
    // eslint-disable-next-line
  }, [])

  const login = async (email, password, remember) => {
    try {
      const response = await axios({
        method: 'POST',
        data: {
          username: email,
          password: password,
          remember: remember,
        },
        url: `${process.env.REACT_APP_SERVER_URL}/login`,
        withCredentials: true,
      })

      const data = response.data

      if (data.success) {
        setUser({ ...data.user })
        return { success: true }
      } else {
        return { error: !data.success, message: data.message }
      }
    } catch (err) {
      return { error: true, message: 'Could not connect to the server' }
    }
  }

  const logout = async () => {
    setUser(undefined)

    try {
      const response = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER_URL}/logout`,
        withCredentials: true,
      })

      const { data } = response
      if (data.success) {
        console.log('User logged out successfully')
      } else {
        console.error(data.message)
      }
    } catch (e) {
      console.error(e)
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
      console.log('Logged in session expired/logged out')
    }

    setLoading(false)
  }

  const value = { login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
