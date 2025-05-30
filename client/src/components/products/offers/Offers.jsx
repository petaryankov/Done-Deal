import { useState, useEffect } from "react";
import Offer from "../offer/Offer";
import Loader from "../../loader/Loader";
import offerService from "../../../services/offerService";
import ErrorMessage from "../../error-message/ErrorMessage";

export default function Offers() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setLoading(true);

        offerService.getAll()
            .then(setOffers)
            .catch((error) => {
                setErrorMessage(error.message);
                console.error('Error fetching offer:', error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="mb-10 text-3xl text-center font-bold tracking-tight text-red-700">All Offers</h2>
                    {offers.length > 0
                        ?
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {offers.map((offer) => (
                                <Offer key={offer._id} offer={offer} />
                            ))}
                        </div>
                        : <ErrorMessage error={errorMessage} />
                    }
                </div>
            </div>
        </>
    );
}