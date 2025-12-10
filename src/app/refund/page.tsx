import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Refund & Cancellation Policy - ResizeMe',
    description: 'Read our Refund and Cancellation Policy. Learn about subscription cancellations and our refund terms.',
};

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Refund & Cancellation Policy</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Cancellation Policy</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            ResizeMe provides a subscription-based service. Users can cancel their subscription at any time directly through their account dashboard or by contacting our support team.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                            <li><strong>Immediate Cancellation:</strong> You can cancel your subscription instantly from the dashboard.</li>
                            <li><strong>Access Continuation:</strong> Upon cancellation, you will continue to have access to premium features until the end of your current billing cycle.</li>
                            <li><strong>No Further Charges:</strong> Once cancelled, you will not be charged for any subsequent billing periods.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Refund Policy</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Due to the nature of digital goods and instant access to premium features, we generally do not offer refunds once a subscription period has started.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                            <li><strong>Non-refundable:</strong> Payments for the current billing cycle (monthly or yearly) are non-refundable.</li>
                            <li><strong>Exceptions:</strong> In cases of technical errors (e.g., double billing) or if the service was completely unavailable for a significant period, you may be eligible for a refund. Please contact us within 7 days of the incident.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Contact Us</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            If you have any questions about our Refund & Cancellation Policy, please contact us at:
                        </p>
                        <p className="mt-2 font-medium text-gray-900 dark:text-white">
                            Email: handleresizeme@gmail.com
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
