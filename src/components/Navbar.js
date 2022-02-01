import React, { useContext } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { RiUserAddFill, RiLogoutBoxRLine } from 'react-icons/ri'
import Navlink from './Navlink'
import AuthContext from '../context/AuthContext'
import LogOutBtn from './LogoutBtn'
import Sidebar from './Sidebar'
import '../styles/Navbar.css'

function Navbar() {
  const { loggedIn } = useContext(AuthContext)
  return (
    <div className='navbar'>
      {loggedIn && <Sidebar />}
      <div className='navbar-link'>
        {!loggedIn && <><FaUserAlt /><Navlink to='/login' name='Logowanie' /></>}
        {!loggedIn && <><RiUserAddFill /><Navlink to='/register' name='Rejestracja' /></>}
        {loggedIn && <><FaUserAlt /><Navlink to='/profile' name='Profil' /></>}
        {loggedIn && <><RiLogoutBoxRLine /><LogOutBtn /></>}
      </div>
    </div>
  )
}

export default Navbar
