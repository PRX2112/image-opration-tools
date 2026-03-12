/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://resizeme.in',
    generateRobotsTxt: true,
    exclude: ['/terms', '/privacy'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
    // Generate an index sitemap and split by size
    sitemapSize: 7000,
}
