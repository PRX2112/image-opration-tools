# ResizeMe - Online Image Tools Platform

ResizeMe is a comprehensive, privacy-focused online image manipulation platform built with Next.js 14. It offers a suite of professional-grade tools for resizing, cropping, compressing, and converting images directly in your browser or via secure server-side processing.

![ResizeMe Preview](/hero-preview.png)

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/) (Radix Primitives) + Lucide Icons
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Image Processing**:
  - **Server-Side**: [`sharp`](https://sharp.pixelplumbing.com/) (High-performance Node.js image processing)
  - **Client-Side**: HTML5 Canvas API
- **Utilities**: `jszip` (Batch downloads), `react-dropzone` (File handling), `react-image-crop`, `react-compare-slider`

## ✨ Features

### Core Tools
- **🖼️ Image Resize**: 
  - Scale by percentage or fixed dimensions.
  - Aspect ratio locking.
  - **Bulk Resize**: Process multiple images at once and download as ZIP.
- **✂️ Image Crop**: 
  - Interactive drag-to-select interface.
  - Presets (1:1, 16:9, 4:5) and freeform cropping.
- **🗜️ Image Compress**: 
  - Smart compression for JPG, PNG, and WebP.
  - **Visual Comparison**: Live "Before vs After" slider to check quality.
- **🔄 Format Convert**: 
  - Batch convert between PNG, JPG, WebP, AVIF, GIF, and HEIC.
  - Auto-zip for multiple file downloads.

### Creative Tools
- **🔍 Image Enlarger**: 
  - **Smart Upscale**: 2x or 4x enlargement using Lanczos3 interpolation with unsharp masking for crisp details.
- **🐸 Meme Generator**: 
  - Zero-latency client-side editor.
  - Add top/bottom text, customize drag-and-drop text layers (font, color, stroke).
- **🎨 Color Picker**: 
  - Extract precise colors from any image.
  - Magnifier zoom for pixel-perfect selection.
  - Copy HEX, RGB, and HSL values with history.
- **arrows_counter_clockwise Rotate & Flip**: 
  - **Rotate**: 90° presets or custom angle slider with background fill.
  - **Flip**: Mirror text/images horizontally or vertically.

## 🔒 Privacy & Performance
- **Hybrid Processing**: Heavy tasks (resize, compress) use server-side `sharp` for maximum quality, while interactive tasks (memes) runs entirely in the browser.
- **No Long-Term Storage**: Processed files are streamed back immediately; we do not store user images (Cloud storage implementation in progress).

## 🗺️ Roadmap

### Phase 9: Cloud & Infrastructure (Upcoming)
- [ ] Integration with Cloudflare R2 / AWS S3 for secure temp storage
- [ ] Redis/Upstash for job queues and rate limiting
- [ ] Virus scanning for uploads

### Phase 10: User System
- [ ] Authentication (NextAuth.js)
- [ ] User Dashboard & History
- [ ] Subscription Plans (Stripe integration)

### Phase 11: SEO & Marketing
- [ ] Tool-specific landing pages
- [ ] JSON-LD structured data
- [ ] Performance monitoring

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License
MIT
