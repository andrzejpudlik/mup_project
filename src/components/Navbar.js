import React, { useContext } from 'react'
import Navlink from './Navlink'
import AuthContext from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const { loggedIn } = useContext(AuthContext)
  return (
    <div className='navbar'>
      {!loggedIn && <Navlink to='/login' name='Logowanie' />}
      {!loggedIn && <Navlink to='/register' name='Rejestracja' />}
      {loggedIn && <Navlink to='/profile' name='Profil' />}
    </div>
  )
}

export default Navbar