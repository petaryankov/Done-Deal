import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Loader from '../../loader/Loader';
import offerService from '../../../services/offerService';

export default function EditOffer() {
    const { offerId } = useParams(); // Get the offerId from the URL
    const [formData, setFormData] = useState({
        _id: '', // Can be set dynamically if needed
        img: '',
        type: '',
        year: '',
        model: '',
        price: '',
        phone: '',
        username: '',
        description: '',
        highlights: ['', '', '', ''], // Set initial highlights as empty strings
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch the current offer details to populate the form
    useEffect(() => {
        setIsLoading(true)
        offerService.getOne(offerId)
            .then((data) => {
                setFormData({
                    _id: data._id,
                    img: data.img,
                    type: data.type,
                    year: data.year,
                    model: data.model,
                    phone: data.phone,
                    price: data.price,
                    username: data.username,
                    description: data.description,
                    highlights: data.highlights || ['', '', '', ''],
                });
            })
            .catch((error) => {
                console.error('Error fetching offer:', error);
                alert("Something went wrong while fetching the offer. Please try again.");
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [offerId]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle changes to the highlights array
    const handleHighlightChange = (e, index) => {
        const newHighlights = [...formData.highlights];
        newHighlights[index] = e.target.value;
        setFormData({
            ...formData,
            highlights: newHighlights,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        offerService.edit(offerId, formData)
            .then(navigate(`/offers/${offerId}`))
            .catch((error) => {
                console.error('Error updating offer:', error);
                alert("Something went wrong while updating the offer. Please try again.");
            })
            .finally(() => {
                setIsLoading(false);
            });

    };

    // Handle cancel button click 
    const handleCancel = () => {
        navigate(`/offers/${offerId}`);
    };

    if (!formData.type) {
        return <Loader />;
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-20">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 className="text-center text-2xl font-bold text-red-600">Edit Product</h2>
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
                    <div>
                        <label htmlFor="highlights" className="block text-sm font-medium text-gray-900">
                            Highlights
                        </label>
                        {formData.highlights.map((highlight, index) => (
                            <div key={index} className="mt-2">
                                <input
                                    type="text"
                                    value={highlight}
                                    onChange={(e) => handleHighlightChange(e, index)}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="mr-2 flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update Product'}
                        </button>

                        {/* Cancel Button */}
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
