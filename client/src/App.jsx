import { Route, Routes } from 'react-router'
import Header from './components/header/Header'
import Home from './components/home/Home'
import './App.css'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog' element={<h1>Catalog</h1>} />
        <Route path='/register' element={<h1>Register</h1>} />
        <Route path='/create' element={<h1>Create</h1>} />
        <Route path='/account' element={<h1>Account</h1>} />
        <Route path='/login' element={<h1>Login</h1>} />
      </Routes>
    </>
  )
}

export default App
