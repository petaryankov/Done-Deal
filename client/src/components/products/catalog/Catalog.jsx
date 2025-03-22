import { useState, useEffect } from "react";
import CatalogItem from "../catalog-item/CatalogItem";

export default function Catalog() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/catalog')
            .then(res => res.json())
            .then(result => {
                const catalog = Object.values(result)
                setProducts(catalog);
            });
    }, []);

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Offers</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <CatalogItem key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}