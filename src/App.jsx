import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

// Routes
import PublicRoute from './Components/Routes/PublicRoute'
import AdminRoute from './Components/Routes/AdminRoute'
import SellerRoute from './Components/Routes/SellerRoute'
import CustomerRoute from './Components/Routes/CustomerRoute'
import Home from './Components/Routes/Home'
import Profile from './Pages/Profile'

// Pages
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import NotFound from './Pages/NotFound'

// Admin Pages
import AdminHome from './Pages/Admin/Home'
import AdminOrders from './Pages/Admin/Orders'
import Users from './Pages/Admin/Users'

// Customer Pages
import CustomerHome from './Pages/Customer/Home'
import Cart from './Pages/Customer/Cart'
import Wishlist from './Pages/Customer/Wishlist'

// Seller Pages
import SellerHome from './Pages/Seller/Home'
import SellerOrders from './Pages/Seller/Orders'
import Products from './Pages/Seller/Products'
import Add from './Pages/Seller/Add'

// Contexts
import { UserProvider } from './Components/Contexts/UserContext'
import { AuthProvider } from './Components/Contexts/AuthContext'

// Styles
import './Styles/styles.scss'

const App = () => {
  return (
    <>
      <Router>
        <UserProvider>
          <AuthProvider>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/' element={<Navigate to='/login' />} />
              <Route element={<PublicRoute />}>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path='/admin-profile' element={<Profile />} />
                <Route path='/admin-home' element={<AdminHome />} />
                <Route path='/admin-orders' element={<AdminOrders />} />
                <Route path='/users' element={<Users />} />
              </Route>
              <Route element={<CustomerRoute />}>
                <Route path='/customer-profile' element={<Profile />} />
                <Route path='/customer-home' element={<CustomerHome />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/wishlist' element={<Wishlist />} />
              </Route>
              <Route element={<SellerRoute />}>
                <Route path='/seller-profile' element={<Profile />} />
                <Route path='/seller-home' element={<SellerHome />} />
                <Route path='/add-product' element={<Add />} />
                <Route path='/seller-orders' element={<SellerOrders />} />
                <Route path='/products' element={<Products />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </UserProvider>
      </Router>
    </>
  )
}

export default App
