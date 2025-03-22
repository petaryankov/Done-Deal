import { Route, Routes } from 'react-router'
import Header from './components/header/Header'
import Home from './components/home/Home'
import './App.css'
import Catalog from './components/catalog/Catalog'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/register' element={<h1>Register</h1>} />
        <Route path='/create' element={<h1>Create</h1>} />
        <Route path='/account' element={<h1>Account</h1>} />
        <Route path='/login' element={<h1>Login</h1>} />
      </Routes>
    </>
  )
}

export default App
