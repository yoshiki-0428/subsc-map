const postCssPlugins = require('./postcss-config.js');

const tailwindConfig = require('./tailwind.config.js');
const config = require('./loadYaml.js');

module.exports = {
  pathPrefix: config.siteConfig.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteConfig.url,
    siteConfig: {
      ...config.siteConfig,
    },
    siteDesign: {
      ...config.siteDesign,
    },
    secretConfig: {
      ...config.secretConfig
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/media`,
        name: 'media'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'css',
        path: `${__dirname}/static/css`
      }
    },
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: process.env.API_URI || 'https://subsc-backend.herokuapp.com',
        queryLimit: 1000, // Default to 100
        contentTypes: ['article', 'tag', 'subsc', 'category'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static`
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteConfig {
                  url
                  title
                  description: subtitle
                }
              }
            }
          }
        `,
        feeds: [{
          serialize: ({ query: { site, allStrapiArticle } }) => (
            allStrapiArticle.edges.map((edge) => ({
              ...edge.node,
              published_at: edge.node.published_at,
              url: site.siteMetadata.siteConfig.url + edge.node.slug,
              guid: site.siteMetadata.siteConfig.url + edge.node.slug,
              custom_elements: [{ content: edge.node.content }]
            }))
          ),
          query: `
              {
                allStrapiArticle(sort: {fields: published_at, order: DESC}) {
                  edges {
                    node {
                      content
                      title
                      updated_at
                      published_at
                      created_at
                      slug
                    }
                  }
                }
              }
            `,
          output: '/rss.xml',
          title: config.siteConfig.title
        }]
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: config.siteConfig.url,
        sitemap: `${config.siteConfig.url}/sitemap.xml`,
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
              withWebp: true,
              ignoreFileExtensions: [],
            }
          },
          'gatsby-remark-embed-youtube',
          'gatsby-plugin-twitter',
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' }
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-external-links'
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/index.js`,
      }
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [config.secretConfig.googleAnalyticsId],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-disqus',
      options: {
        shortname: config.siteConfig.disqusShortname
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage(
              filter: {
                path: { regex: "/^(?!/404/|/404.html|/dev-404-page/)/" }
              }
            ) {
              edges {
                node {
                  path
                }
              }
            }
          }
        `,
        output: '/sitemap.xml',
        serialize: ({ site, allSitePage }) => allSitePage.edges.map((edge) => ({
          url: site.siteMetadata.siteUrl + edge.node.path,
          changefreq: 'daily',
          priority: 0.7
        }))
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteConfig.title,
        short_name: config.siteConfig.title,
        start_url: '/',
        background_color: '#FFF',
        theme_color: '#F7A046',
        display: 'standalone',
        icon: 'static/media/icon.ico'
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-lodash',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [...postCssPlugins],
        cssLoaderOptions: {
          camelCase: false,
        }
      }
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require('tailwindcss')(tailwindConfig),
          require('autoprefixer'),
          ...(process.env.NODE_ENV === 'production'
            ? [require('cssnano')]
            : []),
        ],
      },
    },
    'gatsby-plugin-flow',
    'gatsby-plugin-optimize-svgs',
    'gatsby-plugin-emotion',
  ]
};
