import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useUser } from '../Contexts/UserContext'
import Loading from '../../Pages/Loading'

const SellerRoute = ({ component: Component, ...rest }) => {
  let { user, loading } = useUser()
  return (
    <Route
      {...rest}
      render={(routerProps) => {
        if (loading) {
          return <Loading {...routerProps} />
        }

        return user && user.type === 'seller' ? (
          <Component {...routerProps} />
        ) : (
          <Redirect to='/' />
        )
      }}
    />
  )
}

export default SellerRoute
