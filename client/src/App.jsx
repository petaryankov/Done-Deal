import { Route, Routes } from 'react-router'
import { useState } from 'react'
import { UserContext } from './contexts/UserContext'
import Header from './components/header/Header'
import Home from './components/home/Home'
import Offers from './components/products/offers/Offers'
import OfferDetails from './components/products/offer-details/OfferDetails'
import ErrorNotFound from './components/error-not-found/ErrorNotFond'
import Login from './components/users/login/Login'
import Register from './components/users/regiter/Register'
import Account from './components/users/account/Account'
import CreateOffer from './components/products/create-offer/CreateOffer'
import EditOffer from './components/products/edit-offer/EditOffer'
import Logout from './components/users/account/logout/Logout'
import UserOffers from './components/products/user-offers/UserOffers'
import LaptopOffers from './components/home/laptop-offers/LaptopOffers'
import TabletOffers from './components/home/tablet-offers/TabletOffers'
import SmartphoneOffers from './components/home/smartphone-offers/SmartphoneOffers'
import SmartwatchOffers from './components/home/smartwatche-offers/SmartwatchOffers'
import './App.css'
import AuthGuard from './components/guards/AuthGuard'

function App() {

    const [authData, setAuthData] = useState({});

    const userLoginHandler = (data) => {
        setAuthData(data);

    };

    const userLogoutHandler = () => {
        setAuthData({});
    }



    return (
        <>
            <UserContext.Provider value={{ ...authData, userLoginHandler, userLogoutHandler }}>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/offers' element={<Offers />} />
                    <Route path='/offers/laptops' element={<LaptopOffers />} />
                    <Route path='/offers/tablets' element={<TabletOffers />} />
                    <Route path='/offers/:offerId' element={<OfferDetails />} />
                    <Route path='/offers/smartphones' element={<SmartphoneOffers />} />
                    <Route path='/offers/smartwatches' element={<SmartwatchOffers />} />
                    <Route element={<AuthGuard />}>
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/account' element={<Account />} />
                        <Route path='/create' element={<CreateOffer />} />
                        <Route path='/edit/:offerId' element={<EditOffer />} />
                        <Route path='/user-offers/:username' element={<UserOffers />} />
                    </Route>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/*' element={<ErrorNotFound />} />
                </Routes>
            </UserContext.Provider>
        </>
    )
}

export default App
