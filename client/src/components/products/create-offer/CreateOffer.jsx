import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../../contexts/UserContext';
import offerService from '../../../services/offerService';
import Loader from '../../loader/Loader';
import OfferHighlights from '../offer-highlights/OfferHighlights';

export default function CreateOffer() {
    const { username } = useContext(UserContext)
    const [formData, setFormData] = useState({
        _id: '',
        type: '',
        model: '',
        year: '',
        price: '',
        img: '',
        phone: '',
        username: username,
        description: '',
        highlights: [],
        comments: [],
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    // Handle input changes for form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
 
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        // Clean up empty highlights
    const cleanedHighlights = formData.highlights.filter(highlight => highlight.trim() !== '');
    const cleanedFormData = {
        ...formData,
        highlights: cleanedHighlights,
    };


        offerService.create(cleanedFormData)
            .then(navigate('/offers'))
            .catch((error) => {
                console.error('Error creating offer:', error);
                alert("Something went wrong while creating your offer. Please try again.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-20">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 className="text-center text-2xl font-bold text-red-600">Create New Offer</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Product Type */}
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-900">
                            Product Type
                        </label>
                        <div className="mt-2">
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
                            >
                                <option value="" disabled>Select a product type</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Tablet">Tablet</option>
                                <option value="Smartphone">Smartphone</option>
                                <option value="Smartwatch">Smartwatch</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Model */}
                    <div>
                        <label htmlFor="model" className="block text-sm font-medium text-gray-900">
                            Model
                        </label>
                        <div className="mt-2">
                            <input
                                id="model"
                                name="model"
                                type="text"
                                value={formData.model}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Product Year */}
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-900">
                            Year
                        </label>
                        <div className="mt-2">
                            <input
                                id="year"
                                name="year"
                                type="number"
                                min={2010}
                                max={2025}
                                value={formData.year}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Product Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-900">
                            Price
                        </label>
                        <div className="mt-2">
                            <input
                                id="price"
                                name="price"
                                type="number"
                                min={1}
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                            Phone
                        </label>
                        <div className="mt-2">
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                minLength={10}
                                maxLength={10}
                                placeholder="Enter 10-digit phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Product Image URL */}
                    <div>
                        <label htmlFor="img" className="block text-sm font-medium text-gray-900">
                            Image URL
                        </label>
                        <div className="mt-2">
                            <input
                                id="img"
                                name="img"
                                type="text"
                                value={formData.img}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Product Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                            Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Product Highlights */}
                    <OfferHighlights 
                    highlights={formData.highlights}
                    setHighlights={(newHighlights) => setFormData({...formData, highlights: newHighlights})} 
                    />

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={isLoading}
                        >
                            Create Offer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}