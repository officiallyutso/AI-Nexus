// src/App.js
import { useState } from 'react';
import { submitRating, getAIReputation } from './utils/contracts';
import { createAttestation } from './utils/eas';


function AIReputationSystem() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formData, setFormData] = useState({
        aiId: 1,
        messageId: '',
        relevance: 0,
        accuracy: 0
    });
    const [reputation, setReputation] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'aiId' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // Submit rating to smart contract
            const tx = await submitRating(
                formData.aiId,
                formData.messageId,
                Number(formData.relevance),
                Number(formData.accuracy)
            );
            
            console.log('Rating submitted:', tx);
                  // Fetch updated reputation
                  const newReputation = await getAIReputation(formData.aiId);
                  setReputation(newReputation);
                  console.log('New reputation:', newReputation);
                  setSuccess('Rating submitted successfully!');

            // Create attestation
            const attestation = await createAttestation(
                formData.aiId,
                formData.messageId,
                Number(formData.relevance),
                Number(formData.accuracy)
            );
            console.log('Attestation created:', attestation);

      
            setFormData(prev => ({ ...prev, messageId: '', relevance: 0, accuracy: 0 }));
        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <h1 className="text-2xl font-bold mb-8">AI Reputation System</h1>
                                
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">AI ID (1-3)</label>
                                        <input
                                            type="number"
                                            name="aiId"
                                            min="1"
                                            max="3"
                                            value={formData.aiId}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Message ID</label>
                                        <input
                                            type="text"
                                            name="messageId"
                                            value={formData.messageId}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Relevance (0-5)</label>
                                        <input
                                            type="number"
                                            name="relevance"
                                            min="0"
                                            max="5"
                                            value={formData.relevance}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Accuracy (0-5)</label>
                                        <input
                                            type="number"
                                            name="accuracy"
                                            min="0"
                                            max="5"
                                            value={formData.accuracy}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div className="pt-5">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            {loading ? 'Submitting...' : 'Submit Rating'}
                                        </button>
                                    </div>
                                </form>

                                {error && (
                                    <div className="mt-4 text-red-600">{error}</div>
                                )}

                                {success && (
                                    <div className="mt-4 text-green-600">{success}</div>
                                )}

                               {/* {formData.messageId && (
                                    <MessageRatings 
                                        messageId={formData.messageId}
                                        onRatingUpdate={(ratingData) => {
                                            console.log('Rating updated:', ratingData);
                                        }}
                                    />
                                )} */}
                                {reputation && (
                                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                        <h2 className="text-lg font-semibold mb-2">AI Reputation</h2>
                                        <p>Average Relevance: {reputation.averageRelevance}</p>
                                        <p>Average Accuracy: {reputation.averageAccuracy}</p>
                                        <p>Overall Reputation: {reputation.overallReputation}</p>
                                        <p>Total Messages: {reputation.totalMessages}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AIReputationSystem;