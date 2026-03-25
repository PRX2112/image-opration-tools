'use client';

import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import VisitorCounter from '@/components/VisitorCounter';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import UltimateGuide from '@/components/sections/UltimateGuide';
import AdBanner from '@/components/AdBanner';
import { useState } from 'react';
import {
  Maximize2, Crop, Minimize2, RefreshCw, Sparkles, Shield, Zap,
  Smile, Pipette, RotateCw, FlipHorizontal, Maximize,
  Users, Star, Clock, Lock, CheckCircle2, ChevronDown, ChevronUp,
  ImageIcon, Eraser, Pencil
} from 'lucide-react';

const tools = [
  {
    icon: Maximize2, title: 'Image Resize', href: '/tools/resize',
    description: 'Resize to any dimension. Perfect for social media, websites, and more.',
    gradient: 'from-purple-500 to-blue-500', badge: 'Popular',
  },
  {
    icon: Crop, title: 'Image Crop', href: '/tools/crop',
    description: 'Crop with precision. Choose from preset aspect ratios or custom sizes.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Minimize2, title: 'Image Compress', href: '/tools/compress',
    description: 'Reduce file size without losing quality. Faster loading guaranteed.',
    gradient: 'from-orange-500 to-yellow-500', badge: 'Popular',
  },
  {
    icon: RefreshCw, title: 'Format Convert', href: '/tools/convert',
    description: 'Convert between PNG, JPG, WebP, SVG, and more — instantly.',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    icon: Smile, title: 'Meme Generator', href: '/tools/meme-generator',
    description: 'Create memes with custom text, fonts, and emojis. Export as PNG or JPG.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Pipette, title: 'Color Picker', href: '/tools/color-picker',
    description: 'Extract colors from any image. Get HEX, RGB, and HSL values instantly.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: RotateCw, title: 'Rotate Image', href: '/tools/rotate',
    description: 'Rotate by 90°, 180°, 270°, or custom angles. Fix orientation in seconds.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: FlipHorizontal, title: 'Flip Image', href: '/tools/flip',
    description: 'Flip horizontally or vertically. Create mirror effects with one click.',
    gradient: 'from-red-500 to-pink-500',
  },
  {
    icon: Maximize, title: 'Image Enlarger', href: '/tools/enlarge',
    description: 'Upscale images up to 4x with smart sharpening. AI-powered enhancement.',
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    icon: Pencil, title: 'Watermark', href: '/tools/watermark',
    description: 'Add text or image watermarks to protect your photos.',
    gradient: 'from-cyan-500 to-blue-500', badge: 'New',
    badgeColor: 'bg-green-400 text-green-900',
  },
  {
    icon: Eraser, title: 'Background Remover', href: '/tools/background-remover',
    description: 'Remove image backgrounds in seconds using AI. Export with transparency.',
    gradient: 'from-violet-500 to-purple-500', badge: 'New',
    badgeColor: 'bg-green-400 text-green-900',
  },
  {
    icon: ImageIcon, title: 'Bulk Resize', href: '/tools/resize/bulk',
    description: 'Resize multiple images at once. Download all as a ZIP archive.',
    gradient: 'from-sky-500 to-indigo-500',
  },
];

const stats = [
  { icon: Users, value: '10M+', label: 'Images Processed' },
  { icon: Star, value: '4.9/5', label: 'User Rating' },
  { icon: Clock, value: '< 2s', label: 'Average Processing' },
  { icon: Lock, value: '100%', label: 'Private & Secure' },
];

const useCases = [
  { emoji: '✍️', role: 'Bloggers', desc: 'Optimized images for faster page loads and better SEO rankings.' },
  { emoji: '📱', role: 'Social Media Managers', desc: 'Get perfect sizes for Instagram, Facebook, and YouTube.' },
  { emoji: '💻', role: 'Web Developers', desc: 'Improve performance and Core Web Vitals with optimized assets.' },
  { emoji: '🎨', role: 'Designers', desc: 'Convert formats and compress images without losing quality.' },
  { emoji: '🎓', role: 'Students', desc: 'Quickly resize images for presentations and assignments.' },
  { emoji: '🏢', role: 'Professionals', desc: 'Prepare images for reports, emails, and marketing materials.' },
];

const faqs = [
  {
    q: 'Does resizing reduce image quality?',
    a: 'Not necessarily. Our tools are designed to maintain the best possible quality while adjusting dimensions.',
  },
  {
    q: 'Is this tool free to use?',
    a: 'Yes, all features are completely free with no hidden costs.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No, you can use all tools instantly without signing up.',
  },
  {
    q: 'Are my images safe and private?',
    a: 'We prioritize your privacy and security. All image processing happens directly in your browser, and your files are never uploaded or stored on our servers. You remain in full control of your data at all times.',
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between items-center p-5 text-left"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white pr-4">{faq.q}</h3>
            {open === i
              ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
              : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 animate-fade-in">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative">

      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-float" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 text-sm font-medium mb-2">
              <Sparkles className="w-4 h-4" />
              100% Free · Fast · Secure · Private
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-gray-900 dark:text-white mb-2">Resize Images Online</span>
              <span className="block shimmer-text">Without Losing Quality</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Resize, compress, and optimize your images instantly with our free online tools. Whether you're preparing images for websites, social media, or professional use, ResizeMe helps you get the perfect size and format in seconds.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400 items-center">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Supports JPG, PNG, WebP</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Fast, secure, and private</span>
              </div>
              <VisitorCounter />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a href="#tools" className="btn btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl animate-pulse-glow">
                Start Editing Now →
              </a>
              <a href="#features" className="btn btn-secondary text-lg px-8 py-4">
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="py-10 bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="text-white animate-count-up" style={{ animationDelay: `${i * 100}ms` }}>
                <s.icon className="w-7 h-7 mx-auto mb-2 opacity-80" />
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-sm opacity-80 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tools Grid ─── */}
      <section id="tools" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Free Online Image Tools</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-balance">
              ResizeMe provides a collection of powerful yet simple tools designed to handle all your image optimization needs: Image Resizer, Compressor, Format Converter, and more. All tools are browser-based, meaning your images are processed securely without being stored on our servers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div key={tool.title} className="animate-slide-in-up" style={{ animationDelay: `${index * 60}ms` }}>
                <ToolCard {...tool} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── In-Feed Homepage Ad ─── */}
      <section className="py-8 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">Advertisement</div>
          <AdBanner dataAdSlot="HOMEPAGE_FEED_SLOT" dataAdFormat="fluid" />
        </div>
      </section>

      {/* ─── Before / After Section ─── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              See the Difference
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Drag the slider to compare original and compressed images side-by-side.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <BeforeAfterSlider
                beforeSrc="/before.jpg"
                afterSrc="/after.jpg"
                beforeLabel="Original"
                beforeSubLabel="2.4 MB"
                afterLabel="Compressed"
                afterSubLabel="210 KB"
              />
              <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                👆 Drag the slider to compare
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                91% smaller — zero visible difference
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our smart compression algorithm removes invisible metadata and applies perceptual encoding, dramatically reducing file size while preserving what your eyes actually see.
              </p>
              <ul className="space-y-3">
                {[
                  'Websites load 10× faster',
                  'Higher Google PageSpeed scores',
                  'Save storage space',
                  'Share images faster',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="/tools/compress" className="btn btn-primary inline-flex">
                Try Image Compressor →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section id="features" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose ResizeMe?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Process images in under 2 seconds using WebAssembly technology.', gradient: 'from-yellow-400 to-orange-500' },
              { icon: Shield, title: 'Privacy First', desc: 'Your images never leave your device. All processing is done locally in your browser.', gradient: 'from-green-500 to-teal-500' },
              { icon: Sparkles, title: 'Completely Free', desc: 'Every tool, every feature, forever free. No signup, no credit card, no limits.', gradient: 'from-purple-500 to-blue-500' },
            ].map((f, i) => (
              <div key={f.title} className="card text-center animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <f.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Who Uses ResizeMe ─── */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Who is ResizeMe For?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              ResizeMe is designed for anyone who works with images. Whether you need to resize a single image or optimize multiple files, our tools make the process simple and efficient.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <div key={uc.role} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="text-3xl mb-3">{uc.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{uc.role}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Three simple steps — done in seconds.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            {[
              { n: '1', color: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400', title: 'Select Your Tool', desc: 'Choose from Resize, Crop, Compress, Rotate, Convert, and more.' },
              { n: '2', color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400', title: 'Upload Image', desc: 'Drag & drop or select files. Supports JPG, PNG, WebP, and more.' },
              { n: '3', color: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400', title: 'Download Result', desc: 'Apply changes instantly and download your optimized image.' },
            ].map(s => (
              <div key={s.n} className="text-center p-6 relative z-10">
                <div className={`w-16 h-16 ${s.color} rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-sm`}>{s.n}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEO Text Content ─── */}
      <section className="py-20 bg-gray-50/80 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 md:text-4xl">What is Image Resizing?</h2>
            <p className="text-lg leading-relaxed">
              Image resizing is the process of adjusting the dimensions (width and height) of an image without significantly affecting its quality. It is commonly used to optimize images for websites, social media platforms, email attachments, and storage efficiency.
            </p>
            <p className="text-lg leading-relaxed">
              Large images can slow down websites and negatively impact user experience. By resizing images properly, you can improve page load speed, enhance performance, and ensure compatibility across different devices.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 md:text-4xl">Why Optimizing Images is Important</h2>
            <p className="text-lg leading-relaxed">
              Optimizing your images is not just about reducing file size — it's about improving overall performance and usability.
            </p>
            <ul className="space-y-3 mt-4 text-lg">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" /> <span><strong>Faster website loading speed</strong> → Better SEO rankings</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" /> <span><strong>Improved user experience</strong> → Lower bounce rates</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" /> <span><strong>Reduced storage usage</strong> → Efficient file management</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" /> <span><strong>Better compatibility</strong> → Works across all devices and platforms</span></li>
            </ul>
            <p className="mt-6 text-lg leading-relaxed">
              Whether you're a blogger, developer, designer, or business owner, properly optimized images are essential.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 md:text-4xl">Social Media Image Size Guide</h2>
            <p className="text-lg leading-relaxed">
              Different platforms require different image sizes. Using incorrect dimensions can result in cropped or blurry images.
            </p>
            <p className="text-lg leading-relaxed">Here are some commonly used sizes:</p>
            <ul className="space-y-3 mt-4 text-lg bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <li className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
                <strong className="text-gray-900 dark:text-white">Instagram Post</strong>
                <span className="font-mono text-purple-600 dark:text-purple-400">1080 × 1080 px</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 py-3">
                <strong className="text-gray-900 dark:text-white">Facebook Cover</strong>
                <span className="font-mono text-purple-600 dark:text-purple-400">820 × 312 px</span>
              </li>
              <li className="flex justify-between items-center pt-3">
                <strong className="text-gray-900 dark:text-white">YouTube Thumbnail</strong>
                <span className="font-mono text-purple-600 dark:text-purple-400">1280 × 720 px</span>
              </li>
            </ul>
            <p className="mt-6 text-lg">
              👉 <a href="/tools/resize" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-md">Use our tools</a> to instantly resize images for any platform without guesswork.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 md:text-4xl">Your Privacy Matters</h2>
            <div className="flex flex-col md:flex-row gap-6 items-start bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800/30">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full text-blue-600 dark:text-blue-400 flex-shrink-0">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <p className="text-lg leading-relaxed">
                  We prioritize your privacy and security. All image processing happens directly in your browser, and your files are never uploaded or stored on our servers.
                </p>
                <p className="text-lg leading-relaxed mt-2">
                  You remain in full control of your data at all times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why I Built ResizeMe ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-purple-50 dark:bg-purple-900/10 rounded-3xl p-8 md:p-12 border border-purple-100 dark:border-purple-800/30">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Why I Built ResizeMe</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              <p>
                Hi, I'm the creator of ResizeMe. I built this platform because I was frustrated with the current state of online image tools. Every time I needed to quickly resize a photo or crop a logo, I was met with websites that either demanded an account, bombarded me with pop-up ads, or secretly uploaded my private files to their servers.
              </p>
              <p>
                I wanted a tool that felt like a native desktop app—lightning fast, beautiful to look at, and fiercely protective of user privacy. By leveraging modern browser technologies like WebAssembly, ResizeMe processes every image locally on your device. We never see your photos, and we never will. It's free, it respects your time, and it just works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Guides & Resources ─── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Learn More About Image Optimization</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Dive deeper into our comprehensive guides to master your digital assets.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/what-is-image-resizing" className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">What is Image Resizing?</h3>
              <p className="text-gray-600 dark:text-gray-400">Read the complete guide on how resizing differs from cropping and why it matters.</p>
            </Link>
            <Link href="/why-image-optimization-matters" className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Why Image Optimization Matters</h3>
              <p className="text-gray-600 dark:text-gray-400">Discover the real-world impact of optimization on SEO, Core Web Vitals, and UX.</p>
            </Link>
            <Link href="/social-media-image-sizes" className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Social Media Image Sizes 2026</h3>
              <p className="text-gray-600 dark:text-gray-400">The definitive pixel-perfect guide for Instagram, Facebook, YouTube, and X.</p>
            </Link>
            <Link href="/image-format-guide" className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Image Format Guide</h3>
              <p className="text-gray-600 dark:text-gray-400">JPEG vs PNG vs WebP vs SVG. Learn exactly which format to use and when.</p>
            </Link>
            <Link href="/compress-images-without-losing-quality" className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Compress Without Losing Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">Understand the magic behind lossy algorithms and chroma subsampling.</p>
            </Link>
          </div>
        </div>
      </section>

      <UltimateGuide />

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-pink-500/10 animate-gradient" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Start Resizing Your Images Now
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Use our free tools to resize, compress, and optimize your images in seconds — no technical skills required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#tools" className="btn btn-primary text-lg px-8 py-4 inline-flex animate-pulse-glow">
                  Start Now — It&apos;s Free
                </a>
                <a href="/tools/compress" className="btn btn-secondary text-lg px-8 py-4 inline-flex">
                  Compress an Image
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
