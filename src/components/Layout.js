import React from 'react'
import Navbar from './Navbar'

function Layout(props) {
  return (
    <>
      <Navbar />
      <div>{props.children}</div>
    </>
  )
}

export default Layout
