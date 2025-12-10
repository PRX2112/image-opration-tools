export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 md:p-12 shadow-xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Last updated: December 9, 2025
                    </p>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Welcome to ResizeMe ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our image processing service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.1 Personal Information</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                When you create an account, we collect:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Email address</li>
                                <li>Name (optional)</li>
                                <li>Password (encrypted)</li>
                                <li>Profile picture (if provided via OAuth)</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.2 Usage Information</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We automatically collect certain information when you use our service:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Image processing history (file names, sizes, tools used)</li>
                                <li>Download counts and usage statistics</li>
                                <li>Device information and browser type</li>
                                <li>IP address and location data</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.3 Payment Information</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Payment processing is handled by Razorpay. We do not store your complete credit card information. We only retain transaction IDs and payment status for record-keeping purposes.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We use the collected information for:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Providing and maintaining our image processing services</li>
                                <li>Managing your account and subscription</li>
                                <li>Processing payments and preventing fraud</li>
                                <li>Sending service-related notifications and updates</li>
                                <li>Improving our services and developing new features</li>
                                <li>Analyzing usage patterns and optimizing performance</li>
                                <li>Complying with legal obligations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Image Processing and Storage</h2>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.1 Client-Side Processing</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Most image processing happens directly in your browser. Your images are not uploaded to our servers unless you use specific features that require server-side processing.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.2 Server-Side Processing</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                When server-side processing is required, your images are:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Processed immediately and deleted from our servers</li>
                                <li>Never stored permanently without your explicit consent</li>
                                <li>Transmitted using secure, encrypted connections (HTTPS)</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.3 Image History (Pro/Business Plans)</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                For Pro and Business subscribers, we store metadata about processed images (file names, sizes, processing dates) but not the actual image content, unless you explicitly save images to cloud storage.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Data Sharing and Disclosure</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li><strong>Service Providers:</strong> With trusted third-party service providers (e.g., Razorpay for payments, hosting providers) who assist in operating our service</li>
                                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                                <li><strong>Protection:</strong> To protect our rights, property, or safety, or that of our users</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Data Security</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We implement industry-standard security measures to protect your information:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>SSL/TLS encryption for all data transmission</li>
                                <li>Encrypted password storage using bcrypt</li>
                                <li>Secure database with access controls</li>
                                <li>Regular security audits and updates</li>
                                <li>Limited employee access to personal data</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Your Rights and Choices</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                You have the following rights regarding your personal information:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li><strong>Access:</strong> Request a copy of your personal data</li>
                                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                                <li><strong>Export:</strong> Download your data in a portable format</li>
                                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                                <li><strong>Restrict Processing:</strong> Limit how we use your data</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                To exercise these rights, please contact us at handleresizeme@gmail.com
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Cookies and Tracking</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We use cookies and similar tracking technologies to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Maintain your login session</li>
                                <li>Remember your preferences (theme, language)</li>
                                <li>Analyze site usage and performance</li>
                                <li>Provide personalized content</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                You can control cookies through your browser settings, but disabling them may affect functionality.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Advertising</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                This site displays ads provided by Google AdSense to support the free tier of our service.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9.1 Google AdSense & Cookies</h3>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.</li>
                                <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to this site and/or other sites on the Internet.</li>
                                <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
                                <li>Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9.2 Data Usage</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                When you visit our website, certain data is collected to facilitate ad serving:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li><strong>Device Information:</strong> Browser type, operating system, and IP address.</li>
                                <li><strong>Location Data:</strong> Approximate location based on IP address.</li>
                                <li><strong>Browsing Activity:</strong> Pages visited and interactions with ads.</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                This data helps measure the effectiveness of advertising and protects against fraud and invalid traffic.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Children's Privacy</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. International Data Transfers</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Data Retention</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We retain your personal information for as long as necessary to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Provide our services to you</li>
                                <li>Comply with legal obligations</li>
                                <li>Resolve disputes and enforce agreements</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                When you delete your account, we will delete or anonymize your personal data within 30 days, except where retention is required by law.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">13. Changes to This Privacy Policy</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We may update this Privacy Policy from time to time. We will notify you of any material changes by:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Posting the new Privacy Policy on this page</li>
                                <li>Updating the "Last updated" date</li>
                                <li>Sending you an email notification (for significant changes)</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Your continued use of the service after changes constitutes acceptance of the updated policy.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">14. Contact Us</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div className="bg-gray-100 dark:bg-gray-900/50 rounded-lg p-6 space-y-2">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Email:</strong> handleresizeme@gmail.com
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Support:</strong> handleresizeme@gmail.com
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Website:</strong> https://resizeme.in
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">15. GDPR Compliance (EU Users)</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                If you are located in the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR):
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Right to be informed about data collection and use</li>
                                <li>Right to access your personal data</li>
                                <li>Right to rectification of inaccurate data</li>
                                <li>Right to erasure ("right to be forgotten")</li>
                                <li>Right to restrict processing</li>
                                <li>Right to data portability</li>
                                <li>Right to object to processing</li>
                                <li>Rights related to automated decision-making</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Our lawful basis for processing your data includes consent, contract performance, legal obligations, and legitimate interests.
                            </p>
                        </section>

                        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                By using ResizeMe, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
