import React from 'react';

export default function OfferHighlights({ highlights, setHighlights }) {
    // Handle changes to the highlights array
    const handleHighlightChange = (e, index) => {
        const newHighlights = [...highlights];
        newHighlights[index] = e.target.value.trim();
        setHighlights(newHighlights);
    };

    // Add a new highlight
    const addHighlightHandler = () => {
        setHighlights([...highlights, '']);
    };

    // Remove a highlight
    const removeHighlightHandler = (index) => {
        const newHighlights = highlights.filter((_, i) => i !== index);
        setHighlights(newHighlights);
    };

    const isAddButtonDisabled = highlights.some(highlight => highlight.trim() === '');


    return (

        <div>
            <label htmlFor="highlights" className="block text-sm font-medium text-gray-900">
                Highlights
            </label>
            {highlights.map((highlight, index) => (
                <div key={index} className="mt-2">
                    <input
                        type="text"
                        value={highlight}
                        onChange={(e) => handleHighlightChange(e, index)}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
                    />
                    {/* Remove Highlight Button */}
                    <button
                        type="button"
                        onClick={() => removeHighlightHandler(index)}
                        className="text-red-600 mt-2"
                    >
                        Remove
                    </button>
                </div>
            ))}

            {/* Add Highlight Button */}
            <div className="mt-2">
                <button
                    type="button"
                    onClick={addHighlightHandler}
                    disabled={isAddButtonDisabled}
                    className="bg-indigo-600 text-white text-sm px-4 py-2 rounded shadow-xs hover:bg-indigo-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Add Highlight
                </button>
            </div>
        </div>

    );
}