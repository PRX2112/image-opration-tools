'use client';

import ToolCard from '@/components/ToolCard';
import {
  Maximize2,
  Crop,
  Minimize2,
  RefreshCw,
  Sparkles,
  Shield,
  Zap,
  Smile,
  Pipette,
  RotateCw,
  FlipHorizontal,
  Maximize,
} from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';

export default function Home() {
  const tools = [
    {
      icon: Maximize2,
      title: 'Image Resize',
      description:
        'Resize your images to any dimension while maintaining quality. Perfect for social media, websites, and more.',
      href: '/tools/resize',
      gradient: 'from-purple-500 to-blue-500',
    },
    {
      icon: Crop,
      title: 'Image Crop',
      description:
        'Crop and trim your images with precision. Choose from preset aspect ratios or create custom crops.',
      href: '/tools/crop',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Minimize2,
      title: 'Image Compress',
      description:
        'Reduce file size without losing quality. Optimize images for faster loading and better performance.',
      href: '/tools/compress',
      gradient: 'from-orange-500 to-yellow-500',
    },
    {
      icon: RefreshCw,
      title: 'Format Convert',
      description:
        'Convert between image formats instantly. Support for PNG, JPG, WebP, SVG, and more.',
      href: '/tools/convert',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      icon: Smile,
      title: 'Meme Generator',
      description:
        'Create hilarious memes with custom text, fonts, and emojis. Export as PNG or JPG.',
      href: '/tools/meme-generator',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Pipette,
      title: 'Color Picker',
      description:
        'Extract colors from any image. Get HEX, RGB, and HSL values instantly.',
      href: '/tools/color-picker',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: RotateCw,
      title: 'Rotate Image',
      description:
        'Rotate images by 90°, 180°, 270°, or custom angles. Perfect for orientation fixes.',
      href: '/tools/rotate',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: FlipHorizontal,
      title: 'Flip Image',
      description:
        'Flip images horizontally or vertically. Create mirror effects with one click.',
      href: '/tools/flip',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      icon: Maximize,
      title: 'Image Enlarger',
      description:
        'Upscale images up to 4x with smart sharpening. AI-powered quality enhancement.',
      href: '/tools/enlarge',
      gradient: 'from-emerald-500 to-green-500',
    },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process images instantly with client-side processing',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your images never leave your device',
    },
    {
      icon: Sparkles,
      title: 'Generous Free Tier',
      description: 'Core features are free forever. Upgrade for advanced tools.',
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-gray-900 dark:text-white mb-2">
                Transform Your Images
              </span>
              <span className="block gradient-text">Instantly & Free</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Professional image tools right in your browser. Resize, crop,
              compress, and convert images with zero uploads and complete
              privacy.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>100% Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Instant Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Free Forever</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a href="#tools" className="btn btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-shadow">
                Start Editing Now →
              </a>
              <a href="#features" className="btn btn-secondary text-lg px-8 py-4">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Image Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to edit and optimize your images, all in one
              place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div
                key={tool.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ToolCard {...tool} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose ResizeMe?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card text-center animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <AdBanner adSlot="homepage-bottom" />
      </div>
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Ready to Transform Your Images?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Start using our free tools now. No signup required.
              </p>
              <a href="#tools" className="btn btn-primary text-lg px-8 py-4 inline-flex">
                Start Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
