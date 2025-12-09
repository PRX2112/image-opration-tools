'use client';

import { useState } from 'react';

export default function CancelSubscriptionButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleCancel = async () => {
        if (
            !confirm(
                'Are you sure you want to cancel your subscription? You will continue to have access until the end of your billing period.'
            )
        ) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/subscription/cancel', { method: 'POST' });
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Failed to cancel subscription. Please try again.');
            }
        } catch (error) {
            console.error('Error canceling subscription:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleCancel}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? 'Canceling...' : 'Cancel Subscription'}
        </button>
    );
}
