import React from 'react'
import { NavLink as Link } from 'react-router-dom'

export default function Navlink({ to, name }) {

  const button = {
    border: "none",
    background: "none",
    color: "white",
    cursor: "pointer",
    height: "100px",
    fontSize: "15px",
    padding: "15px",
    margin: "10px"
  }

  return (
    <Link to={to}>
      <button style={button}>
        {name}
      </button>
    </Link>
  )
}