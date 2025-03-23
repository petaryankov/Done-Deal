import { Route, Routes } from 'react-router'
import Header from './components/header/Header'
import Home from './components/home/Home'
import Offers from './components/products/offers/Offers'
import OfferDetails from './components/products/offer-details/OfferDetails'
import ErrorNotFound from './components/error-not-found/ErrorNotFond'
import './App.css'

function App() {

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/offers' element={<Offers />} />
                <Route path='/offers/:offerId' element={<OfferDetails />} />
                <Route path='/register' element={<h1>Register</h1>} />
                <Route path='/create' element={<h1>Create</h1>} />
                <Route path='/account' element={<h1>Account</h1>} />
                <Route path='/login' element={<h1>Login</h1>} />
                <Route path='/*' element={<ErrorNotFound />} />
            </Routes>
        </>
    )
}

export default App
