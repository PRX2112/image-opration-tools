import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      // Resize specific
      { source: '/resize-jpg', destination: '/tools/resize/jpg' },
      { source: '/resize-png', destination: '/tools/resize/png' },
      { source: '/resize-webp', destination: '/tools/resize/webp' },
      { source: '/resize-photo', destination: '/tools/resize' }, // 'photo' is generic

      // Compress specific
      { source: '/compress-jpg', destination: '/tools/compress/jpg' },
      { source: '/compress-png', destination: '/tools/compress/png' },
      { source: '/compress-webp', destination: '/tools/compress/webp' },
      { source: '/compress-gif', destination: '/tools/compress/gif' },

      // Convert specific
      { source: '/convert-jpg-to-png', destination: '/tools/convert/jpg-to-png' },
      { source: '/convert-png-to-jpg', destination: '/tools/convert/png-to-jpg' },
      { source: '/convert-png-to-webp', destination: '/tools/convert/png-to-webp' },
      { source: '/convert-heic-to-jpg', destination: '/tools/convert/heic-to-jpg' },

      // Other tools
      { source: '/crop-photo', destination: '/tools/crop' },
      { source: '/rotate-image', destination: '/tools/rotate' },
      { source: '/flip-image', destination: '/tools/flip' },
    ];
  },
};
export default nextConfig;
