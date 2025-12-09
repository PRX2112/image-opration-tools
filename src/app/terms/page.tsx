export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 md:p-12 shadow-xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Last updated: December 9, 2025
                    </p>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Welcome to ResizeMe. By accessing or using our service, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our service.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                These Terms constitute a legally binding agreement between you and ResizeMe ("we," "us," or "our"). We reserve the right to update these Terms at any time, and your continued use of the service constitutes acceptance of any changes.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                ResizeMe is an online image processing platform that provides tools for:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Image resizing and scaling</li>
                                <li>Image cropping and rotation</li>
                                <li>Image compression and format conversion</li>
                                <li>Image enhancement and upscaling (Pro/Business plans)</li>
                                <li>Meme generation and other creative tools</li>
                                <li>Batch processing (Pro/Business plans)</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We offer both free and paid subscription tiers with varying features and usage limits.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Account Registration</h2>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3.1 Account Creation</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                To access certain features, you must create an account. You agree to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Provide accurate, current, and complete information</li>
                                <li>Maintain and update your information to keep it accurate</li>
                                <li>Maintain the security of your password</li>
                                <li>Accept responsibility for all activities under your account</li>
                                <li>Notify us immediately of any unauthorized use</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3.2 Account Eligibility</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                You must be at least 13 years old to use ResizeMe. If you are under 18, you must have parental or guardian consent. By using the service, you represent that you meet these requirements.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Subscription Plans and Billing</h2>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.1 Free Plan</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Our Free plan includes basic features with the following limitations:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>10MB maximum file size</li>
                                <li>50 downloads per month</li>
                                <li>No image history or cloud storage</li>
                                <li>Standard processing speed</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.2 Paid Subscriptions</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Paid subscriptions (Pro and Business) are billed on a recurring basis (monthly or yearly). By subscribing, you agree to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Pay all fees associated with your subscription</li>
                                <li>Automatic renewal unless cancelled before the renewal date</li>
                                <li>Prices are subject to change with 30 days notice</li>
                                <li>All payments are processed securely through Razorpay</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.3 Refunds</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We offer a 7-day money-back guarantee for first-time subscribers. After 7 days, all payments are non-refundable. Refunds are processed within 5-10 business days.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.4 Cancellation</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                You may cancel your subscription at any time. Upon cancellation:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>You will retain access until the end of your current billing period</li>
                                <li>No refund will be provided for the remaining period</li>
                                <li>Your account will revert to the Free plan</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Acceptable Use Policy</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                You agree NOT to use ResizeMe to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Process illegal, harmful, or offensive content</li>
                                <li>Violate any intellectual property rights</li>
                                <li>Upload malware, viruses, or malicious code</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Use automated tools to abuse the service (scraping, bots)</li>
                                <li>Resell or redistribute our services without permission</li>
                                <li>Process images containing child exploitation material</li>
                                <li>Harass, threaten, or harm others</li>
                                <li>Violate any applicable laws or regulations</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Violation of this policy may result in immediate account termination without refund.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Intellectual Property Rights</h2>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6.1 Your Content</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                You retain all rights to images you upload and process. By using our service, you grant us a limited license to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Process your images as requested</li>
                                <li>Store metadata for Pro/Business users (not actual images)</li>
                                <li>Use anonymized data for service improvement</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6.2 Our Content</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                All content on ResizeMe, including but not limited to text, graphics, logos, software, and design, is owned by us or our licensors and protected by copyright, trademark, and other intellectual property laws.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Privacy and Data Protection</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Your privacy is important to us. Our collection and use of personal information is governed by our <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>, which is incorporated into these Terms by reference.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Key points:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Most processing happens in your browser</li>
                                <li>Server-processed images are deleted immediately after processing</li>
                                <li>We do not sell your data to third parties</li>
                                <li>You can request deletion of your data at any time</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Disclaimers and Limitations of Liability</h2>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8.1 Service "As Is"</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                ResizeMe is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Merchantability or fitness for a particular purpose</li>
                                <li>Uninterrupted or error-free operation</li>
                                <li>Accuracy, reliability, or quality of results</li>
                                <li>Security of data transmission</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8.2 Limitation of Liability</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                To the maximum extent permitted by law, ResizeMe shall not be liable for:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Indirect, incidental, special, or consequential damages</li>
                                <li>Loss of profits, data, or business opportunities</li>
                                <li>Damages exceeding the amount you paid in the last 12 months</li>
                                <li>Third-party actions or content</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8.3 Backup Responsibility</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                You are solely responsible for maintaining backups of your original images. We are not responsible for any loss of data.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Indemnification</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                You agree to indemnify, defend, and hold harmless ResizeMe, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Your use of the service</li>
                                <li>Your violation of these Terms</li>
                                <li>Your violation of any third-party rights</li>
                                <li>Content you upload or process</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Termination</h2>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">10.1 Termination by You</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                You may terminate your account at any time by contacting support or using the account deletion feature in your dashboard.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">10.2 Termination by Us</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We reserve the right to suspend or terminate your account at any time, with or without notice, for:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Violation of these Terms</li>
                                <li>Fraudulent or illegal activity</li>
                                <li>Non-payment of fees</li>
                                <li>Prolonged inactivity</li>
                                <li>Any reason at our sole discretion</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">10.3 Effect of Termination</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Upon termination:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Your access to the service will cease immediately</li>
                                <li>Your data may be deleted after 30 days</li>
                                <li>No refunds will be provided for prepaid periods</li>
                                <li>Sections of these Terms that should survive will remain in effect</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Modifications to Service</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We reserve the right to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Modify, suspend, or discontinue any part of the service</li>
                                <li>Change features, functionality, or pricing</li>
                                <li>Impose usage limits or restrictions</li>
                                <li>Update these Terms at any time</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We will provide reasonable notice of material changes when possible.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Third-Party Services</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Our service may integrate with or link to third-party services (e.g., Razorpay for payments, OAuth providers for authentication). We are not responsible for:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>The availability or functionality of third-party services</li>
                                <li>Third-party terms of service or privacy policies</li>
                                <li>Actions or content of third parties</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">13. Dispute Resolution</h2>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">13.1 Governing Law</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">13.2 Arbitration</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Any disputes arising from these Terms or your use of the service shall be resolved through binding arbitration in accordance with Indian arbitration laws, except where prohibited by law.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">13.3 Jurisdiction</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                You agree to submit to the exclusive jurisdiction of the courts located in India for any disputes that cannot be resolved through arbitration.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">14. General Provisions</h2>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">14.1 Entire Agreement</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                These Terms, together with our Privacy Policy, constitute the entire agreement between you and ResizeMe.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">14.2 Severability</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">14.3 Waiver</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Our failure to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">14.4 Assignment</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                You may not assign or transfer these Terms without our prior written consent. We may assign these Terms without restriction.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">15. Contact Information</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                If you have any questions about these Terms, please contact us:
                            </p>
                            <div className="bg-gray-100 dark:bg-gray-900/50 rounded-lg p-6 space-y-2">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Email:</strong> legal@resizeme.in
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Support:</strong> handleresizeme@gmail.com
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Website:</strong> https://resizeme.in
                                </p>
                            </div>
                        </section>

                        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                By using ResizeMe, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
