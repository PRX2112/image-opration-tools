/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://resizeme.in',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
    exclude: ['/dashboard/*', '/admin/*', '/auth/*', '/tools/resize*', '/tools/crop*', '/tools/compress*', '/tools/convert*', '/tools/rotate*', '/tools/flip*'],
    additionalPaths: async (config) => {
        const result = []

        // SEO landing pages with high priority
        const seoPages = [
            '/resize-image-online',
            '/compress-image-online',
            '/crop-image-online',
            '/convert-image-format',
        ]

        seoPages.forEach((page) => {
            result.push({
                loc: page,
                changefreq: 'weekly',
                priority: 0.9,
                lastmod: new Date().toISOString(),
            })
        })

        // Manual list of rewrites from next.config.ts to match SEO landing pages
        const rewrites = [
            '/resize-jpg',
            '/resize-png',
            '/resize-webp',
            '/resize-photo',
            '/compress-jpg',
            '/compress-png',
            '/compress-webp',
            '/compress-gif',
            '/convert-jpg-to-png',
            '/convert-png-to-jpg',
            '/convert-png-to-webp',
            '/convert-heic-to-jpg',
            '/crop-photo',
            '/rotate-image',
            '/flip-image',
        ]

        for (const path of rewrites) {
            result.push({
                loc: path,
                changefreq: 'daily',
                priority: 0.7,
                lastmod: new Date().toISOString(),
            })
        }

        return result
    },
}
