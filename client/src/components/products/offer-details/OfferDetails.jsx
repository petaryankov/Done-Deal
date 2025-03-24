import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { Link, useParams, useNavigate } from 'react-router';
import Loader from '../../loader/Loader';

const reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function OfferDetails() {
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
        return <div>Offer not found or loading error!</div>;
    }

    return (
        <div className="bg-white">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li key={offer._id}>
                            <div className="flex items-center">
                                <Link to={offer.img} className="mr-2 text-sm font-medium text-gray-900 ml-30">
                                    {offer.type}
                                </Link>
                                <svg
                                    fill="currentColor"
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li className="text-sm">
                            <Link to={offer.img} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {offer.type}
                            </Link>
                        </li>
                    </ol>
                </nav>

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

                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            aria-hidden="true"
                                            className={classNames(reviews.average > rating ? 'text-gray-900' : 'text-gray-200', 'size-5 shrink-0')}
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{reviews.average} out of 5 stars</p>
                                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {reviews.totalCount} reviews
                                </a>
                            </div>
                        </div>
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
                    </div>
                </div>
            </div>
        </div>
    );
}