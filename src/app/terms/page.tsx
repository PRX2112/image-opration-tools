export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 md:p-12 shadow-xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
                                ResizeMe is a completely free online image processing platform that provides tools for:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Image resizing and scaling</li>
                                <li>Image cropping and rotation</li>
                                <li>Image compression and format conversion</li>
                                <li>Image enhancement and upscaling</li>
                                <li>Meme generation and other creative tools</li>
                                <li>Batch processing</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                All features are available free of charge without any hidden fees or subscriptions.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Acceptable Use Policy</h2>
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
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Intellectual Property Rights</h2>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.1 Your Content</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                You retain all rights to images you upload and process. By using our service, you grant us a limited license to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Process your images as requested</li>
                                <li>Use anonymized data for service improvement</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.2 Our Content</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                All content on ResizeMe, including but not limited to text, graphics, logos, software, and design, is owned by us or our licensors and protected by copyright, trademark, and other intellectual property laws.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Privacy and Data Protection</h2>
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
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Disclaimers and Limitations of Liability</h2>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6.1 Service "As Is"</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                ResizeMe is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Merchantability or fitness for a particular purpose</li>
                                <li>Uninterrupted or error-free operation</li>
                                <li>Accuracy, reliability, or quality of results</li>
                                <li>Security of data transmission</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6.2 Limitation of Liability</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                To the maximum extent permitted by law, ResizeMe shall not be liable for:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Indirect, incidental, special, or consequential damages</li>
                                <li>Loss of profits, data, or business opportunities</li>
                                <li>Third-party actions or content</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6.3 Backup Responsibility</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                You are solely responsible for maintaining backups of your original images. We are not responsible for any loss of data.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Indemnification</h2>
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
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Modifications to Service</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We reserve the right to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Modify, suspend, or discontinue any part of the service</li>
                                <li>Change features or functionality</li>
                                <li>Update these Terms at any time</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We will provide reasonable notice of material changes when possible.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. General Provisions</h2>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9.1 Entire Agreement</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                These Terms, together with our Privacy Policy, constitute the entire agreement between you and ResizeMe.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9.2 Severability</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9.3 Waiver</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Our failure to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Contact Information</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                If you have any questions about these Terms, please contact us:
                            </p>
                            <div className="bg-gray-100 dark:bg-gray-900/50 rounded-lg p-6 space-y-2">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Email:</strong> handleresizeme@gmail.com
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

