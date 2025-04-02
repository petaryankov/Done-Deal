import { Link } from "react-router";

export default function OffersSection() {
    const offerTypes = [
        { name: 'Laptops', path: '/offers/laptops' },
        { name: 'Tablets', path: '/offers/tablets' },
        { name: 'Smartphones', path: '/offers/smartphones' },
        { name: 'Smartwatches', path: '/offers/smartwatches' }
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto text-center px-6">
                {/* Check All Offers Button */}
                <div className="flex items-center justify-center gap-x-6 mb-6">
                    <Link
                        to="/offers"
                        className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Check All Offers
                    </Link>
                </div>
                {/* Description Text */}
                <p className="mt-4 text-lg text-gray-500">Explore each category!</p>
                {/* Offers Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {offerTypes.map((offer) => (
                        <Link
                            key={offer.name}
                            to={offer.path}
                            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center space-y-4 hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
                        >
                            <h3 className="text-xl font-semibold text-gray-800">{offer.name}</h3>
                            <div className="mt-4">
                                <span className="text-sm font-semibold text-red-600 hover:text-red-700">
                                    See Offers &rarr;
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
