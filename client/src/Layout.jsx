import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <div className='max-w-7xl mx-auto flex flex-col min-h-screen py-4 px-8'>
        <Header />
        <Outlet />
    </div>
  )
}

export default Layout