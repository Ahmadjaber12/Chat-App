import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import { useStore } from './store/useAuthStore'
import Loading from './components/Loading'
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemes'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth}=useStore();
  const {theme}=useThemeStore()    
  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  
  if(!isCheckingAuth && !authUser) return (
   <Loading/>     
  )
  
  return (

    <div data-theme={theme}>
      <Toaster/>
        <Navbar/>
        <Routes>
          <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
          <Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to="/"/>}/>
          <Route path='/login' element={!authUser ? <LoginPage/> :  <Navigate to="/"/>}/>
          <Route path='/settings' element={<SettingsPage/>}/>
          <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
        </Routes>
    </div>
  )
}

export default App