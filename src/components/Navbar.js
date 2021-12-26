import React from 'react'
import Navlink from './Navlink'
import './Navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
      <Navlink to='/login' name='Logowanie' />
      <Navlink to='/register' name='Rejestracja' />
    </div>
  )
}

export default Navbar
