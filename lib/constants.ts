export const SEO: SiteMetaData = {
  url: 'development' === process.env.NODE_ENV ? 'localhost:3000' : 'https://thecryptodrip.com',
  title: 'development' === process.env.NODE_ENV ? '(LOCAL) The Crypto Drip' : 'The Crypto Drip',
  description: 'A platform made and owned by crypto content creators.'
}
