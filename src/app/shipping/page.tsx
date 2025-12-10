import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shipping & Delivery Policy - ResizeMe',
    description: 'Read our Shipping & Delivery Policy. We are a digital service, so delivery is instant upon purchase.',
};

export default function ShippingPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Shipping & Delivery Policy</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Digital Delivery</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            ResizeMe is a Software-as-a-Service (SaaS) platform. We do not sell or ship physical goods. All our services are delivered digitally via the internet.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Instant Access</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Upon successful payment for a subscription plan, access to premium features (PRO or Business) is activated instantly for your account. You will receive a confirmation email with your order details.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Delivery Issues</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            If you have completed a payment but your account has not been upgraded, please try logging out and logging back in. If the issue persists, contact our support team immediately at <strong>handleresizeme@gmail.com</strong> with your transaction contents.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. International Users</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Our services are available globally. There are no shipping restrictions or additional delivery fees for international users.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
