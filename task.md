# Online Image Tools Platform - Development Tasks

## Phase 1: Foundation & Core UI (Week 1)
- [x] Project setup (Next.js 14+ App Router + TypeScript + Tailwind)
- [x] Install dependencies
  - [x] ShadCN UI components (Radix UI)
  - [x] Framer Motion
  - [x] React Dropzone
  - [x] Zustand for state management
  - [x] Lucide Icons (already installed)
- [x] Global Components
  - [x] Enhanced Navbar with dropdowns (Resize/Crop/Compress/Convert/More/Pricing)
  - [x] Dropdown menus with Framer Motion animations
  - [x] Enhanced drag & drop upload box
  - [x] File validation (10MB limit)
  - [x] Image preview panel (before/after)
  - [x] Processing spinner/loader
  - [x] Download button component
  - [x] Footer (legal, contact)
  - [x] Chat widget bubble
- [x] Update Homepage
  - [x] Marketing blocks (Perfect Quality/Lightning Fast/Easy To Use)
  - [x] Tool cards for all features (9 tools total)
  - [x] Dark theme refinements

## Phase 2: Authentication & User System (Week 2)
- [ ] Install NextAuth.js / Auth.js
- [ ] Setup authentication
  - [ ] Email + Password auth
  - [ ] Google OAuth
  - [ ] Auth middleware protection
- [ ] Create auth pages
  - [ ] `/login` page
  - [ ] `/signup` page
  - [ ] Auth modal component
- [ ] User dashboard
  - [ ] `/dashboard` route
  - [ ] User image history
  - [ ] Subscription status display
  - [ ] Download limits tracking
- [ ] Database setup for users

## Phase 3: Pricing & Payments (Week 2)
- [ ] Install Stripe SDK
- [ ] Create `/pricing` page
  - [ ] Free plan (10MB, Basic tools, No history)
  - [ ] Pro plan (200MB, All tools, History, AI Upscale)
  - [ ] Business plan (Unlimited, All tools, History, API)
  - [ ] Monthly & yearly billing options
- [ ] Stripe integration
- [x] Convert pages
  - [x] `/tools/convert` - main converter
  - [x] `/tools/convert/svg`
  - [x] `/tools/convert/png`
  - [x] `/tools/convert/jpg`
  - [x] `/tools/convert/gif`
  - [x] `/tools/convert/heic-to-jpg`
  - [x] `/tools/convert/webp-to-png`
  - [x] `/tools/convert/webp-to-jpg`
  - [x] `/tools/convert/png-to-jpg`
  - [x] `/tools/convert/png-to-svg`
- [x] Features
  - [x] Multi-file upload
  - [x] Automatic format detection
  - [x] DPI & quality controls
  - [x] ZIP batch download

## Phase 6: Image Compress Tool (Week 4)
- [ ] Install FFmpeg.wasm for GIF processing (Deferred - using Sharp first)
- [x] Create compression utilities
  - [x] Quality-based compression (Server-side)
  - [x] File size estimation
- [x] Create `useImageCompress` hook
- [x] Compress pages
  - [x] `/tools/compress` - main compress tool
  - [x] `/tools/compress/jpeg`
  - [x] `/tools/compress/png`
  - [x] `/tools/compress/webp`
- [ ] Features
  - [x] Compression strength slider
  - [x] Live file size comparison (Before/After)
  - [ ] Batch compression
  - [ ] Quality visualization
- [x] Meme Generator (`/tools/meme-generator`)
  - [x] Upload image
  - [x] Top/Bottom text input
  - [x] Text font & spacing controls
  - [x] Emoji support
  - [x] Text stroke options
  - [x] Export as PNG/JPG
- [x] Color Picker (`/tools/color-picker`)
  - [x] Click any pixel
  - [x] HEX/RGB/HSL output
  - [x] Color history
  - [ ] Gradient extractor
- [x] Rotate Image (`/tools/rotate`)
  - [x] 90°, 180°, 270° presets
  - [x] Custom degree rotation
  - [x] Background fill options
- [x] Flip Image (`/tools/flip`)
  - [x] Horizontal flip
  - [x] Vertical flip
  - [x] Reset option
- [/] Image Enlarger (`/tools/enlarge`)
  - [/] 2x / 4x upscale
  - [/] Smart sharpen
  - [ ] AI upscaling (optional via Replicate)

## Phase 9: Cloud Storage & Processing (Week 6)
- [ ] Setup Cloudflare R2 / AWS S3
  - [ ] Temporary file storage
  - [ ] Auto file purge after 30 minutes
  - [ ] Signed URLs only
- [ ] Setup Redis / Upstash
  - [ ] Job queues for bulk processing
  - [ ] Rate limits
- [ ] Security
  - [ ] Virus scan on upload
  - [ ] File type validation
  - [ ] Size limits enforcement

## Phase 10: Dashboard & History (Week 6)
- [ ] User dashboard enhancements
  - [ ] Image processing history
  - [ ] Storage usage display
  - [ ] Download history
  - [ ] Subscription management
- [ ] Database schema for history
- [ ] API routes for history CRUD

## Phase 11: SEO & Marketing Pages (Week 7)
- [ ] Tool-specific SEO pages
  - [ ] `/resize-image-online`
  - [ ] `/compress-jpeg-free`
  - [ ] `/convert-png-to-jpg`
- [ ] Auto-generated tool blog pages
- [ ] JSON-LD structured data
- [ ] Domain setup
- [ ] SSL certificates
- [ ] Analytics integration
- [ ] Error monitoring (Sentry)
- [ ] Performance monitoring

## Optional Advanced Features (Future)
- [ ] Public API access (paid)
- [ ] Mobile PWA
- [ ] Team workspaces
- [ ] Cloud storage sync (Drive, Dropbox)
- [ ] White-label embedding
