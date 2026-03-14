export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        About ResizeMe
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        <strong>ResizeMe</strong> is a free online image editing platform designed to make image resizing, cropping, compressing, and converting simple, fast, and accessible for everyone.
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mt-4">
                        Whether you're preparing images for social media, websites, documents, or personal use, ResizeMe provides powerful tools that work directly in your browser without requiring downloads, installations, or accounts.
                    </p>
                </div>

                {/* Content Cards */}
                <div className="space-y-12">
                    {/* Mission */}
                    <section className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 md:p-12 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                            <p>
                                Our mission is to provide <strong>simple, fast, and privacy-focused image tools</strong> that anyone can use instantly. Many image editing tools are complex, slow, or require users to upload files to remote servers. ResizeMe was created to offer a better alternative — one that prioritizes <strong>speed, simplicity, and privacy</strong>.
                            </p>
                            <p>
                                We believe basic image editing should be easy and accessible for everyone.
                            </p>
                        </div>
                    </section>
                    
                    {/* Privacy */}
                    <section className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 md:p-12 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Privacy-First Image Processing</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                            <p>
                                ResizeMe is designed with privacy in mind.
                            </p>
                            <p>
                                All image processing is performed <strong>locally within your web browser</strong> using modern technologies such as <strong>HTML5 Canvas and WebAssembly</strong>. This means:
                            </p>
                            <ul>
                                <li>Your images <strong>never leave your device</strong></li>
                                <li>Your images are <strong>not uploaded to our servers</strong></li>
                                <li>Your images are <strong>not stored or shared</strong></li>
                            </ul>
                            <p>
                                Everything happens directly on your computer or mobile device, giving you complete control over your files.
                            </p>
                        </div>
                    </section>
                    
                    {/* Features */}
                    <section className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 md:p-12 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What You Can Do With ResizeMe</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                            <p>
                                ResizeMe offers a variety of tools to help you quickly edit and optimize images online, including:
                            </p>
                            <ul>
                                <li>Resize images to custom dimensions</li>
                                <li>Compress images to reduce file size</li>
                                <li>Crop images to the desired aspect ratio</li>
                                <li>Convert images between formats</li>
                                <li>Prepare images for social media platforms</li>
                                <li>Optimize images for websites and blogs</li>
                            </ul>
                            <p>
                                All tools are designed to be <strong>fast, easy to use, and accessible from any device</strong>.
                            </p>
                        </div>
                    </section>

                    {/* Speed & Simplicity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 shadow-lg">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-6">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Built for Speed and Simplicity</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                ResizeMe works entirely in your browser, which means you can start editing images instantly without waiting for uploads or downloads.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                The interface is designed to be clean and simple so that anyone — from beginners to professionals — can resize or optimize images quickly.
                            </p>
                        </section>

                        {/* Audience */}
                        <section className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 shadow-lg">
                            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-6">
                                <span className="text-2xl">👥</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Who Can Use ResizeMe</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                ResizeMe is useful for many types of users, including content creators, bloggers, students, designers, website owners, and social media managers.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Anyone who needs a <strong>quick and reliable online image editing tool</strong> can use ResizeMe.
                            </p>
                        </section>
                    </div>

                    {/* Improvements & Contact */}
                    <section className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 md:p-12 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Continuous Improvements</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                            <p>
                                We are constantly working to improve ResizeMe by adding new features, improving performance, and making the tools even easier to use.
                            </p>
                            <p>
                                User feedback plays an important role in helping us improve the platform.
                            </p>
                        </div>
                        
                        <hr className="border-gray-200 dark:border-gray-700 my-8" />
                        
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                            <p>
                                If you have questions, feedback, or suggestions, we would love to hear from you.
                            </p>
                            <div className="bg-gray-100 dark:bg-gray-900/50 rounded-lg p-6 space-y-2 not-prose mt-6">
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
                            <p className="mt-6 font-semibold">
                                Thank you for using ResizeMe.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
