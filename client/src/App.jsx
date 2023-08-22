import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import Login from './pages/Login'
import Layout from './Layout'
import Register from './pages/Register'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './pages/Account'
import Places from './pages/Places'
import PlacesForm from './pages/PlacesForm'
import Placepage from './pages/Placepage'
import BookingsPage from './pages/BookingsPage'
import Booking from './Booking'
axios.defaults.baseURL = 'http://localhost:8080';

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<IndexPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/account/places" element={<Places/>}/>
      <Route path="/account/places/new" element={<PlacesForm/>}/>
      <Route path="/account/places/:id" element={<Account/>}/>
      <Route path="/place/:id" element={<Placepage/>}/>
      <Route path="/account/bookings" element={<BookingsPage/>}/>
      <Route path="/account/bookings/:id" element={<Booking/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
