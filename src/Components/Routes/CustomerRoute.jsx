import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useUser } from '../Contexts/UserContext'
import Loading from '../../Pages/Loading'

const CustomerRoute = ({ component: Component, ...rest }) => {
  let { user, loading } = useUser()
  return (
    <Route
      {...rest}
      render={(routerProps) => {
        if (loading) {
          return <Loading {...routerProps} />
        }

        return user && user.type === 'customer' ? (
          <Component {...routerProps} />
        ) : (
          <Redirect to='/' />
        )
      }}
    />
  )
}

export default CustomerRoute
