import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../api/contexts/UserContext';
import Loader from '../../loader/Loader';
import offerService from '../../../services/offerService';
import { UserIcon } from '@heroicons/react/24/solid';

export default function OfferComments({ offer }) {
    const { username } = useContext(UserContext);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const MAX_COMMENT_LENGTH = 200;

    // Handle comment submission
    const handleSubmitComment = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        const updatedOffer = {
            ...offer,
            comments: [...offer.comments, { user: username, text: newComment }],
        };

        offerService.edit(offer._id, updatedOffer)
            .then(() => {
                setNewComment(""); // Clear the textarea after comment submission
                offer.comments = [...offer.comments, { user: username, text: newComment }];
            })
            .catch((err) => {
                console.error('Error adding comment:', err);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });



    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="mt-30">
            <h2 className="text-2xl font-semibold text-gray-900">Comments</h2>
            {error && <p className="text-red-600">There was an issue loading the comments.</p>}
            <div className="mt-4">
                {/* Display Comments */}
                <div className="space-y-3">
                    {offer.comments.length === 0 ? (
                        <p>No comments yet. Be the first to comment!</p>
                    ) : (
                        offer.comments.map((comment, index) => (
                            <div key={index} className="w-1/2 p-2 bg-gray-50 rounded-lg shadow-sm">
                                <div className="flex items-center space-x-1">
                                    <UserIcon className='size-4 text-blue-500'/>
                                    <div className="text-sm font-bold text-indigo-600">{comment.user}</div>
                                </div>
                                <p className="mt-1 text-sm text-gray-700 break-words line-clamp-3">{comment.text}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add New Comment */}
            {username && (
                <form onSubmit={handleSubmitComment} className="mt-6 space-y-3">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows="3"
                        maxLength={MAX_COMMENT_LENGTH}
                        className="w-1/2 p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none overflow-auto max-h-24"
                        placeholder="Write a comment..."
                    />
                    {/* Show character count */}
                    <div className="w-1/2 p-2 text-right text-xs text-gray-500">
                        {newComment.length}/{MAX_COMMENT_LENGTH}
                    </div>

                    <div className="w-1/2 p-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={newComment.length === 0}
                            className="disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        >
                            Post Comment
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
