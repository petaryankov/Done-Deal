import { Link } from "react-router";

export default function Offer({ offer }) {
    return (
        <Link
            key={offer._id}
            to={`/offers/${offer._id}`}
            className="group bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            {/* Image */}
            <img
                alt={offer.type}
                src={offer.img}
                className="w-full h-48 object-cover group-hover:opacity-75 rounded-t-lg"
            />

            {/* Offer Type */}
            <h3 className="mt-4 text-sm text-gray-700 text-center">{offer.type} {offer.model}</h3>

            {/* Price */}
            <p className="mt-1 text-lg font-medium text-gray-900 text-center">€{offer.price}</p>

            {/* Year */}
            <p className="mt-1 text-sm text-gray-500 text-center">{offer.year} year</p>
        </Link>
    );
}
