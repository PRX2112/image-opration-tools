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
                        We are on a mission to make professional image editing accessible to everyone, directly in the browser, with a focus on speed and privacy.
                    </p>
                </div>

                {/* Content Cards */}
                <div className="space-y-12">
                    {/* Mission */}
                    <section className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 md:p-12 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                            <p>
                                In a digital world heavily reliant on visual content, we noticed a problem: simple image tasks were often complicated. Users had to choose between downloading heavy software for basic edits or uploading their private photos to slow, ad-ridden servers.
                            </p>
                            <p>
                                <strong>ResizeMe was built to change that.</strong>
                            </p>
                            <p>
                                We believe that you shouldn't have to compromise your privacy or patience just to crop a photo or convert a file type. Our goal is to provide a comprehensive suite of image tools that run entirely on your device—fast, free, and secure.
                            </p>
                        </div>
                    </section>

                    {/* Core Values */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 shadow-lg">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-6">
                                <span className="text-2xl">🔒</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Privacy First</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                This is our most important value. Unlike other tools, we don't want your data. We engineered our tools to process images using WebAssembly and HTML5 Canvas, meaning your files are processed locally on your computer and never uploaded to our servers.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 shadow-lg">
                            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-6">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Lightning Fast</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Time is precious. By cutting out the server upload/download process, our tools work instantly. Whether you're resizing one image or a hundred, the processing happens as fast as your device allows, with no network lag.
                            </p>
                        </section>
                    </div>

                    {/* Story */}
                    <section className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 md:p-12 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Story</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                            <p>
                                ResizeMe started as a small personal project in 2024. As developers and content creators ourselves, we were frustrated with the existing online tools. They were either too expensive, too complex, or filled with intrusive pop-ups.
                            </p>
                            <p>
                                We decided to build the tool we wanted to use: <strong>Clean, fast, and respectful of the user.</strong>
                            </p>
                            <p>
                                What began as a simple resizer has grown into a powerful platform handling thousands of images daily. We are constantly adding new features like AI enhancement, meme generation, and precise color tools, all while maintaining our core promise of browser-based processing.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
