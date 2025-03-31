import { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import Loader from '../../loader/Loader';
import ErrorNotFound from '../../error-not-found/ErrorNotFond';
import { UserContext } from '../../../api/contexts/UserContext';


export default function OfferDetails() {
    const { username } = useContext(UserContext);
    const { offerId } = useParams();
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3030/jsonstore/offers/${offerId}`)
            .then((res) => res.json())
            .then((result) => {
                setOffer(result);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching offer:', error);
                setLoading(false);
            });
    }, [offerId]);

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this offer?');
        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:3030/jsonstore/offers/${offerId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    navigate('/offers'); // Redirect to offers
                } else {
                    console.error('Failed to delete offer');
                }
            } catch (error) {
                console.error('Error deleting offer:', error);
            }
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (!offer) {
        return <ErrorNotFound />;
    }

    return (
        <div className="bg-white">
            <div className="pt-6">

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8"></div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{offer.description}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8"></div>
                        <h2 className="sr-only">Product information</h2>
                        <img alt={offer.type} src={offer.img} className="w-full rounded-lg object-cover" />
                        <p className="text-3xl tracking-tight text-gray-900">{offer.price}</p>

                        {/* Created by only for loged users*/}
                        {username &&
                        
                            <div className="mt-6">
                                <div className="flex items-center">
                                    <div className="ml-3  font-bold text-black-600 hover:text-indigo-500 mr-2">
                                        Created by:
                                    </div>
                                    <div className="flex items-center font-bold text-indigo-600 mr-2">
                                        {offer.username}
                                    </div>
                                    <div className="flex items-center font-bold text-indigo-600">
                                        {offer.phone}
                                    </div>

                                </div>
                            </div>
                        }
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{offer.description}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {offer.highlights.map((highlight, index) => (
                                        <li key={index} className="text-gray-400">
                                            <span className="text-gray-600">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{offer.description}</p>
                            </div>
                        </div>

                        {/* Edit and Delete Buttons */}
                        {username === offer.username &&
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