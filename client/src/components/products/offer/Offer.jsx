import { Link } from "react-router";

export default function Offer({
    offer
}) {
    return (
        <>
            <Link key={offer._id} to={`/offers/${offer._id}`} className="group">
                <img
                    alt={offer.type}
                    src={offer.img}
                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                />
                <h3 className="mt-4 text-sm text-gray-700">{offer.description}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{offer.price}</p>
                <p className="mt-1 text-sm text-gray-500">{offer.year} year</p>
            </Link>
        </>
    );
}