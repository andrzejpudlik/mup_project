import React, { useContext } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import NotfoundPage from '../pages/NotfoundPage'
import Profile from '../pages/Profile'

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
          </>
        )}
        {loggedIn && (
          <>
            <Route path='/login' element={<Navigate to='/profile' />} />
            <Route path='/register' element={<Navigate to='/profile' />} />
            <Route path='/profile' element={<Profile />} />
          </>
        )}
        <Route path='*' element={<NotfoundPage />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
