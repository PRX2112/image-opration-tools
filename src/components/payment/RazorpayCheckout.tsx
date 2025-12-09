'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface RazorpayCheckoutProps {
    subscriptionId: string;
    razorpaySubscriptionId: string;
    planName: string;
    amount: number;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function RazorpayCheckout({
    subscriptionId,
    razorpaySubscriptionId,
    planName,
    amount,
}: RazorpayCheckoutProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = async () => {
        setIsLoading(true);

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            subscription_id: razorpaySubscriptionId,
            name: 'ResizeMe',
            description: `${planName} Subscription`,
            image: '/logo.png', // Add your logo
            handler: async function (response: any) {
                try {
                    // Verify payment on server
                    const verifyResponse = await fetch('/api/razorpay/verify-payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_subscription_id: response.razorpay_subscription_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });

                    const data = await verifyResponse.json();

                    if (data.success) {
                        // Redirect to dashboard
                        router.push('/dashboard?payment=success');
                    } else {
                        alert('Payment verification failed. Please contact support.');
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.error('Payment verification error:', error);
                    alert('An error occurred. Please try again.');
                    setIsLoading(false);
                }
            },
            prefill: {
                name: '',
                email: '',
                contact: '',
            },
            theme: {
                color: '#6366f1',
            },
            modal: {
                ondismiss: function () {
                    setIsLoading(false);
                },
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? 'Processing...' : 'Subscribe Now'}
        </button>
    );
}
