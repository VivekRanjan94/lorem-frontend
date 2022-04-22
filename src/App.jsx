import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Private Route handlers
import LoginRoute from './Components/Routes/LoginRoute'
import AdminRoute from './Components/Routes/AdminRoute'
import SellerRoute from './Components/Routes/SellerRoute'
import CustomerRoute from './Components/Routes/CustomerRoute'
import NotFound from './Pages/NotFound'

// Route Pages
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Customer from './Switch/Customer'
import Seller from './Switch/Seller'
import Admin from './Switch/Admin'

// Contexts
import { UserProvider } from './Components/Contexts/UserContext'
import { AuthProvider } from './Components/Contexts/AuthContext'

const App = () => {
  return (
    <>
      <Router>
        <UserProvider>
          <AuthProvider>
            <Switch>
              <LoginRoute exact path='/' component={Login} />
              <Route path='/register' component={Register} />
              <CustomerRoute path='/c' component={Customer} />
              <SellerRoute path='/s' component={Seller} />
              <AdminRoute path='/a' component={Admin} />
              <Route path='*' component={NotFound} />
            </Switch>
          </AuthProvider>
        </UserProvider>
      </Router>
    </>
  )
}

export default App
