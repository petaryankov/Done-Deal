import { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { UserContext } from '../../../api/contexts/UserContext';
import Loader from '../../loader/Loader';
import offerService from '../../../services/offerService';
import ErrorNotFound from '../../error-not-found/ErrorNotFond';
import OfferComments from '../offer-comments/OfferComments';
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';


export default function OfferDetails() {
    const { username } = useContext(UserContext);
    const { offerId } = useParams();
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(false)
        offerService.getOne(offerId)
            .then(setOffer)
            .catch((error) => {
                console.error('Error fetching offer:', error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [offerId]);

    const handleDelete = () => {
        const confirmed = window.confirm('Are you sure you want to delete this offer?');
        if (confirmed) {
            setLoading(true);
            setError(false)
            offerService.delete(offerId)
                .then(navigate('/offers'))
                .catch((error) => {
                    console.error('Error deleting offer:', error);
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };


    if (loading) {
        return <Loader />;
    }

    if (error || !offer) {
        return <ErrorNotFound />;
    }

    const isPermitted = username === offer.username || username === 'Admin';

    return (
        <div className="bg-white">
            <div className="pt-6">
                {/* Product info */}
                <div className="mt-10 mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    
                    {/* Offer type */}
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{offer.type}</h1>
                    </div>

                    {/* Image price and user */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8"></div>
                        <img alt={offer.type} src={offer.img} className="w-full rounded-lg object-cover" />
                        <p className='mt-4 text-2xl font-bold text-gray-900'>Price</p>
                        <p className="text-3xl tracking-tight text-gray-900">€{offer.price}</p>

                        {/* Created by only for loged users*/}
                        {username &&
                            <div className="mt-6">
                                <div className="flex items-center">
                                    < UserIcon className="size-6 text-blue-500" />
                                    <div className="flex items-center font-bold text-indigo-600 mr-2">
                                        {offer.username}
                                    </div>
                                    <div className="flex items-center font-bold text-indigo-600">
                                        <DevicePhoneMobileIcon className='size-6 text-blue-500' />
                                        {offer.phone}
                                    </div>
                                </div>
                                <div className="mt-8 flex gap-4">
                                    <Link
                                        to={`/user-offers/${offer.username}`}
                                        className="flex items-center justify-center w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {offer.username} offers
                                    </Link>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">

                        {/* Model */}
                        <div className='text-xl font-medium mt-12'>
                            Model - {offer.model}
                        </div>

                        {/* Description and details */}
                        <div>
                            <h3 className="mt-4 text-sm font-bold text-gray-900">Description</h3>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{offer.description}</p>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="mt-4">
                            <h3 className="text-sm font-bold text-gray-900">Highlights</h3>

                            <div className="mt-2">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {offer.highlights.map((highlight, index) => (
                                        <li key={index} className="text-gray-400">
                                            <span className="text-gray-600">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className='mt-3 text-sm font-bold text-gray-900'>
                            Year - {offer.year}
                        </div>

                        <OfferComments offer={offer} />

                        {/* Edit and Delete Buttons */}
                        {isPermitted &&
                            <div className="mt-8 flex gap-4">
                                <Link
                                    to={`/edit/${offerId}`}
                                    className="flex items-center justify-center w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Edit Offer
                                </Link>

                                <button
                                    onClick={handleDelete}
                                    className="flex items-center justify-center w-full rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Delete Offer
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}