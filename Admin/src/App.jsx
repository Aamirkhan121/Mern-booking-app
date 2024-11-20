import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GetAllBookingData from './pages/GetAllBookingData'
import AdminDashBoard from './pages/AdminDashBoard'
import AdminAddRoom from './pages/AdminAddRoom'
import GetUserData from './pages/GetUserData'
import ReportPage from './pages/AdminReport'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<AdminDashBoard/>}/>
      <Route path='/admin/booking' element={<GetAllBookingData/>}/>
      <Route path='/admin/addroom' element={<AdminAddRoom/>}/>
      <Route path='/admin/users' element={<GetUserData/>}/>
      <Route path='/admin/reports' element={<ReportPage/>}/>
      </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App

