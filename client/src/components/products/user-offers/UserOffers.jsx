import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Offer from "../offer/Offer";
import Loader from "../../loader/Loader";
import offerService from "../../../services/offerService";

export default function UserOffers() {

    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { username } = useParams();

    useEffect(() => {
        setLoading(true);

        offerService.getAll()
            .then((allOffers) => {
                const userOffers = allOffers.filter((offer) => offer.username === username);
                setOffers(userOffers);
            })
            .catch((error) => {
                console.error('Error fetching offers:', error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [username]);

    if (loading) {
        return <Loader />
    }
    const isOffers = offers.length > 0;

    return (
        <>
            {isOffers
                ?
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="text-3xl text-center font-bold tracking-tight text-red-700">Offers by {username}</h2>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {offers.map((offer) => (
                                <Offer key={offer._id} offer={offer} />
                            ))}
                        </div>
                    </div>
                </div>
                :
                <div className="col-span-full text-center text-2xl font-semibold text-red-500 py-12 mt-20">
                    <p>No offers found for {username}</p>
                </div>
            }
        </>
    );
}