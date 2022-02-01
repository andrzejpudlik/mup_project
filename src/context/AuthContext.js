import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

const AuthContext = createContext()

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)

  async function getLoggedIn() {
    const loggedInRes = await axios.get("http://localhost:4000/api/loggedIn")
    setLoggedIn(loggedInRes.data.isLogged)
    setUserData(loggedInRes.data.user)
  }

  useEffect(() => {
    getLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, userData, setUserData }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export { AuthContextProvider }