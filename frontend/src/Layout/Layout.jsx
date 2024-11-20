import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'

const Layout = ({ isAuthenticated, handleLogout }) => {
  return (
    <div className='flex flex-col sticky top-0'>
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Hero/>
    </div>
  )
}

export default Layout
