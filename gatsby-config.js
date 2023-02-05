module.exports = {
  siteMetadata: {
    author: {
      github: `https://github.com/kplaube`,
      gravatar: `https://en.gravatar.com/userimage/12163112/d3ae0c6239980b01ff1f1730b65c2ebe.jpg`,
      linkedin: `https://www.linkedin.com/in/klauslaube/`,
      medium: `https://medium.com/@kplaube`,
      name: `Klaus Peter Laube`,
    },
    contact: `https://about.me/klauslaube`,
    description: `Python, Django e desenvolvimento Web`,
    lang: `pt-br`,
    licenseName: `Creative Commons Attribution`,
    licenseUrl: `http://creativecommons.org/licenses/by/3.0/deed.pt_BR`,
    repositoryUrl: `https://github.com/kplaube/blog`,
    siteUrl: `https://klauslaube.com.br`,
    title: `Klaus Laube`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Klaus Laube`,
        short_name: `klauslaube`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#c4170c`,
        display: `minimal-ui`,
        icon: `src/images/favicon64.png`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 768,
              showCaptions: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.nodes.map((node) => ({
                ...node.frontmatter,
                description: node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
              })),
            query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
            `,
            output: "/feed/rss.xml",
            title: "Klaus Laube",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-19657400-1",
      },
    },
  ],
};
