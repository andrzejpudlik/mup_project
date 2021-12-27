import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function LogOutBtn() {
  const buttonLogout = {
    border: "2px white solid",
    borderRadius: "10px",
    background: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
    padding: "15px",
    margin: "10px"
  }
  const { getLoggedIn } = useContext(AuthContext)

  const navigate = useNavigate()

  async function logOut() {
    await axios.get("http://localhost:4000/api/logout")

    await getLoggedIn()
    navigate('/')
  }

  return <button style={buttonLogout} onClick={logOut}>Wyloguj</button>
}

export default LogOutBtn;