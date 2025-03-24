import { Route, Routes } from 'react-router'
import Header from './components/header/Header'
import Home from './components/home/Home'
import Offers from './components/products/offers/Offers'
import OfferDetails from './components/products/offer-details/OfferDetails'
import ErrorNotFound from './components/error-not-found/ErrorNotFond'
import './App.css'
import Login from './components/users/login/Login'
import Register from './components/users/regiter/Register'
import Account from './components/users/account/Account'
import CreateOffer from './components/products/create-offer/createOffer'

function App() {

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/offers' element={<Offers />} />
                <Route path='/offers/:offerId' element={<OfferDetails />} />
                <Route path='/register' element={<Register />} />
                <Route path='/create' element={<CreateOffer/>} />
                <Route path='/account' element={<Account />} />
                <Route path='/login' element={<Login />} />
                <Route path='/*' element={<ErrorNotFound />} />
            </Routes>
        </>
    )
}

export default App
