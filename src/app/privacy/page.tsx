export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 md:p-12 shadow-xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        <strong>Last updated:</strong> March 14, 2026
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        At <strong>ResizeMe (https://resizeme.in)</strong>, protecting your privacy is important to us. This Privacy Policy document explains what information is collected and recorded by ResizeMe and how we use it.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-8">
                        By using our website, you consent to our Privacy Policy and agree to its terms.
                    </p>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <hr className="border-gray-200 dark:border-gray-700 my-8" />

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                ResizeMe is designed to work primarily within your browser. In most cases, we do not collect personal information.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                However, we may automatically collect certain non-personal information such as:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Internet Protocol (IP) address</li>
                                <li>Browser type and version</li>
                                <li>Device type and operating system</li>
                                <li>Pages visited and time spent on pages</li>
                                <li>Referring website or source</li>
                                <li>General geographic location (country or region)</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                This information is used only to understand how visitors use the website and to improve our services.
                            </p>
                        </section>

                        <hr className="border-gray-200 dark:border-gray-700 my-8" />

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Image Processing and File Privacy</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                ResizeMe provides tools that allow users to resize, crop, compress, and convert images.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                All image processing is performed <strong>locally in your browser</strong> using modern web technologies such as HTML5 Canvas and WebAssembly.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                This means:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Your images are <strong>not uploaded to our servers</strong></li>
                                <li>Your images are <strong>not stored by us</strong></li>
                                <li>Your images remain <strong>on your device</strong></li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                ResizeMe does not access or retain any images processed through the tool.
                            </p>
                        </section>

                        <hr className="border-gray-200 dark:border-gray-700 my-8" />

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Cookies and Web Beacons</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                ResizeMe may use cookies to enhance the user experience.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Cookies may be used to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Store user preferences</li>
                                <li>Analyze website usage</li>
                                <li>Improve site functionality</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Users can choose to disable cookies through their individual browser settings.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                More detailed information about cookie management can be found in your browser's help section.
                            </p>
                        </section>

                        <hr className="border-gray-200 dark:border-gray-700 my-8" />

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Google AdSense and Advertising Partners</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                ResizeMe may display advertisements served by <strong>Google AdSense</strong> and other advertising partners.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Google uses technologies such as cookies, including the <strong>DoubleClick cookie</strong>, to serve ads to users based on their visits to this and other websites.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                These cookies allow Google and its partners to show relevant ads based on your browsing activity.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Users may opt out of personalized advertising by visiting:
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                <a href="https://adssettings.google.com" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://adssettings.google.com</a>
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                For more information on how Google manages data, please visit:
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                <a href="https://policies.google.com/technologies/ads" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>
                            </p>
                        </section>

                        <hr className="border-gray-200 dark:border-gray-700 my-8" />

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Third-Party Privacy Policies</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                ResizeMe’s Privacy Policy does not apply to other advertisers or websites.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We encourage users to consult the respective Privacy Policies of third-party ad servers or services for more detailed information about their practices and how to opt out of certain options.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Third-party services we may use include:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>Google AdSense</li>
                                <li>Google Analytics</li>
                                <li>Content delivery networks (CDN)</li>
                                <li>Website performance monitoring tools</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                These services may collect anonymized usage data according to their own privacy policies.
                            </p>
                        </section>

                        <hr className="border-gray-200 dark:border-gray-700 my-8" />

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Data Security</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We take reasonable measures to protect our website and users.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Because ResizeMe processes images locally in the browser, files do not pass through our servers, reducing the risk of data exposure.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                However, no method of internet transmission is completely secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <hr className="border-gray-200 dark:border-gray-700 my-8" />

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Children's Information</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Protecting children while using the internet is especially important.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                ResizeMe does not knowingly collect any Personal Identifiable Information from children under the age of 13.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                If you believe that your child has provided personal information on our website, please contact us immediately and we will make every effort to remove such information.
                            </p>
                        </section>

                        <hr className="border-gray-200 dark:border-gray-700 my-8" />

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Your Privacy Rights</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Depending on your location, you may have certain privacy rights including:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                                <li>The right to access the information we hold about you</li>
                                <li>The right to request correction or deletion of information</li>
                                <li>The right to opt out of personalized advertising</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Since ResizeMe does not collect personal data directly, most user information remains anonymous.
                            </p>
                        </section>

                        <hr className="border-gray-200 dark:border-gray-700 my-8" />

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Updates to This Privacy Policy</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We may update this Privacy Policy from time to time.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Any changes will be posted on this page with an updated revision date.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                We encourage users to review this page periodically for any updates.
                            </p>
                        </section>

                        <hr className="border-gray-200 dark:border-gray-700 my-8" />

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Contact Us</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                If you have any questions about this Privacy Policy or our website practices, please contact us:
                            </p>
                            <div className="bg-gray-100 dark:bg-gray-900/50 rounded-lg p-6 space-y-2">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Email:</strong> handleresizeme@gmail.com
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Support:</strong> handleresizeme@gmail.com
                                </p>
                            </div>
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

