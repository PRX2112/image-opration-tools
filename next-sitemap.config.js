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
    exclude: ['/dashboard/*', '/admin/*', '/auth/*'],
    additionalPaths: async (config) => {
        const result = []

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
