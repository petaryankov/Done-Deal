import { Route, Routes } from 'react-router'
import Header from './components/header/Header'
import Home from './components/home/Home'
import Offers from './components/products/offers/Offers'
import OfferDetails from './components/products/offer-details/OfferDetails'
import ErrorNotFound from './components/error-not-found/ErrorNotFond'
import Login from './components/users/login/Login'
import Register from './components/users/regiter/Register'
import Account from './components/users/account/Account'
import CreateOffer from './components/products/create-offer/createOffer'
import EditOffer from './components/products/edit-offer/EditOffer'
import { useState } from 'react'
import { UserContext } from './api/contexts/UserContext'
import './App.css'

function App() {

    const [authData, setAuthData] = useState({});

    const userLoginHandler = (data) => {
        setAuthData(data);

    };

    return (
        <>
            <UserContext.Provider value={{...authData, userLoginHandler}}>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/offers' element={<Offers />} />
                    <Route path='/offers/:offerId' element={<OfferDetails />} />
                    <Route path='/edit/:offerId' element={<EditOffer />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/create' element={<CreateOffer />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/*' element={<ErrorNotFound />} />
                </Routes>
            </UserContext.Provider>
        </>
    )
}

export default App
