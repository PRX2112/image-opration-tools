'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Simulate API call - replace with actual endpoint
            await new Promise(resolve => setTimeout(resolve, 1500));

            // TODO: Implement actual contact form submission
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData),
            // });

            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Email */}
                        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Email Us
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                        For general inquiries and support
                                    </p>
                                    <a
                                        href="mailto:handleresizeme@gmail.com"
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        handleresizeme@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Business Inquiries */}
                        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Business Inquiries
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                        For partnerships and enterprise solutions
                                    </p>
                                    <a
                                        href="mailto:handleresizeme@gmail.com"
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        handleresizeme@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Location
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        India
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Quick Links
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="/pricing" className="text-blue-600 dark:text-blue-400 hover:underline">
                                        Pricing Plans
                                    </a>
                                </li>
                                <li>
                                    <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                                        Terms of Service
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Send us a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Subject *
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="billing">Billing Question</option>
                                        <option value="feature">Feature Request</option>
                                        <option value="bug">Bug Report</option>
                                        <option value="business">Business Partnership</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </div>

                                {/* Submit Status Messages */}
                                {submitStatus === 'success' && (
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                                        <p className="text-green-800 dark:text-green-400 text-sm">
                                            ✓ Thank you for your message! We'll get back to you soon.
                                        </p>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                        <p className="text-red-800 dark:text-red-400 text-sm">
                                            ✗ Something went wrong. Please try again or email us directly.
                                        </p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                    By submitting this form, you agree to our{' '}
                                    <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                                        Privacy Policy
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
