import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function CreateOffer() {
  const [formData, setFormData] = useState({
    _ownerId: '', // You can set this dynamically, possibly from the logged-in user
    type: '',
    model: '',
    year: '',
    price: '',
    img: '',
    description: '',
    highlights: ['', '', '', ''], // Set initial highlights as empty strings
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate() // Change useHistory to useNavigate

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle highlights change (array of highlights)
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
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3030/jsonstore/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product created successfully:', data);
        // Redirect after successful creation
        navigate('/offers'); // Use navigate() instead of history.push()
      } else {
        console.error('Error creating product');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="text-center text-2xl font-bold text-red-600">Create New Product</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-900">
              Product Type
            </label>
            <div className="mt-2">
              <input
                id="type"
                name="type"
                type="text"
                value={formData.type}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
              />
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
                type="text"
                value={formData.price}
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

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}