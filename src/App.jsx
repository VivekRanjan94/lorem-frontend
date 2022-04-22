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

// Pages
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Profile from './Pages/Profile'
import NotFound from './Pages/NotFound'

// User Specific Pages
import AdminHome from './Pages/Admin/Home'
import CustomerHome from './Pages/Customer/Home'
import SellerHome from './Pages/Seller/Home'

// Contexts
import { UserProvider } from './Components/Contexts/UserContext'
import { AuthProvider } from './Components/Contexts/AuthContext'

const App = () => {
  return (
    <>
      <Router>
        <UserProvider>
          <AuthProvider>
            <Routes>
              <Route path='/' element={<Navigate to='/login' />} />
              <Route element={<PublicRoute />}>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </Route>
              <Route path='/profile' element={<Profile />} />
              <Route element={<AdminRoute />}>
                <Route path='/admin-home' element={<AdminHome />} />
              </Route>
              <Route element={<CustomerRoute />}>
                <Route path='/customer-home' element={<CustomerHome />} />
              </Route>
              <Route element={<SellerRoute />}>
                <Route path='/seller-home' element={<SellerHome />} />
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
