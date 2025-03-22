import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Catalog() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/catalog')
        .then(res => res.json())
        .then(result => {
            const catalog = Object.values(result)
            setProducts(catalog);
        });
    },[]);

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Offers</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div key={product._id} className="group relative">
                                <img
                                    alt={product.type}
                                    src={product.img}
                                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                />
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <Link to={product.img}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.model}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                        <p className="mt-1 text-sm text-gray-500">{product.year} year</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}