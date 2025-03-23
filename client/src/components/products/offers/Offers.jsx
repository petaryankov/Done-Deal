import { useState, useEffect } from "react";
import Offer from "../offer/Offer";
import Loader from "../../loader/Loader";

export default function Offers() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const abortController = new AbortController();

        fetch('http://localhost:3030/jsonstore/offers', { signal: abortController.signal })
            .then(res => res.json())
            .then(result => {
                const catalog = Object.values(result)
                setOffers(catalog);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching offer:', error);
                setLoading(false);
            });

            return () => {
                abortController.abort();
            }
    }, []);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-3xl text-center font-bold tracking-tight text-red-700">Offers</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {offers.map((offer) => (
                            <Offer key={offer._id} offer={offer} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}