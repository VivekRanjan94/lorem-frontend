import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useUser } from '../Contexts/UserContext'
import Loading from '../../Pages/Loading'

const LoginRoute = ({ component: Component, ...rest }) => {
  let { user, loading } = useUser()
  return (
    <Route
      {...rest}
      render={(routerProps) => {
        if (loading) {
          return <Loading {...routerProps} />
        }

        if (!user) {
          return <Component {...routerProps} />
        }

        switch (user.type) {
          case 'admin': {
            return <Redirect to='/a' />
          }
          case 'seller': {
            return <Redirect to='/s' />
          }
          case 'customer': {
            return <Redirect to='/c' />
          }
          default: {
            return <Redirect to='/login' />
          }
        }
      }}
    />
  )
}

export default LoginRoute
