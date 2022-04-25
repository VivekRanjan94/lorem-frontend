import React from 'react'
import { Link } from 'react-router-dom'

import icon from '../../Assets/logo.png'

const Navbar = ({ links }) => {
  return (
    <nav className='navbar'>
      <div>
        <img className='navbar-icon' src={icon} alt='Lorem' />
      </div>

      <ul className='navbar-links'>
        {links.map((link) => {
          return (
            <li key={Math.random()} className='navbar-links-link'>
              <Link to={link.href}>{link.name}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
