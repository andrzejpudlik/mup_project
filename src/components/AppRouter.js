import React, { useContext } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import NotfoundPage from '../pages/NotfoundPage'
import Profile from '../pages/Profile'
import Users from '../pages/Users'
import Devices from '../pages/Devices'
import Demands from '../pages/Demands'
import Issues from '../pages/Issues'

function AppRouter() {
  const { loggedIn } = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {!loggedIn && (
          <>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/profile' element={<Navigate to='/login' />} />
            <Route path='/users' element={<Navigate to='/login' />} />
            <Route path='/devices' element={<Navigate to='/login' />} />
            <Route path='/demands' element={<Navigate to='/login' />} />
            <Route path='/issues' element={<Navigate to='/login' />} />
          </>
        )}
        {loggedIn && (
          <>
            <Route path='/login' element={<Navigate to='/profile' />} />
            <Route path='/register' element={<Navigate to='/profile' />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/users' element={<Users />} />
            <Route path='/devices' element={<Devices />} />
            <Route path='/demands' element={<Demands />} />
            <Route path='/issues' element={<Issues />} />
          </>
        )}
        <Route path='*' element={<NotfoundPage />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
