import React from 'react'
import Header from '@/ui/components/commons/Header'
import Footer from '@/ui/components/commons/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='vh-100 d-flex flex-column justify-content-between'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
