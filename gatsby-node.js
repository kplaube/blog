const fs = require(`fs-extra`);
const _ = require(`lodash`);
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const RSS = require(`rss`);

const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`);
const blogListTemplate = path.resolve(`./src/templates/blog-list.js`);
const tagsTemplate = path.resolve(`./src/templates/tag.js`);

const _resolveDateForPath = (node) =>
  node.frontmatter && node.frontmatter.date
    ? node.frontmatter.date
        .match(/\d+\-\d+\-\d+/)[0]
        .split("-")
        .join("/")
    : "";

const _resolveSlug = (node, getNode) => {
  if (node.frontmatter && node.frontmatter.slug) {
    return `/${node.frontmatter.slug}`;
  }

  const slug = createFilePath({ node, getNode, basePath: `content` });
  return slug.substr(0, slug.length - 1);
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  let allTags = {};
  const posts = result.data.allMarkdownRemark.edges;

  // Create blog-post page and collect tags
  posts.forEach((post) => {
    const { slug } = post.node.fields;

    if (post.node.frontmatter && post.node.frontmatter.tags) {
      post.node.frontmatter.tags.forEach((tag) => {
        allTags[tag] = allTags[tag] !== undefined ? allTags[tag] + 1 : 1;
      });
    }

    createPage({
      path: slug,
      component: blogPostTemplate,
      context: {
        slug,
      },
    });
  });

  // Create blog-list page
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    const options = {
      component: blogListTemplate,
      context: {
        numPages,
        currentPage: i + 1,
        limit: postsPerPage,
        skip: i * postsPerPage,
      },
    };

    if (i === 0) {
      createPage({
        ...options,
        path: `/`,
      });

      /*
      createPage({
        ...options,
        path: `/index.html`,
      });
      */
    } else {
      createPage({
        ...options,
        path: `/index${i + 1}.html`,
      });
    }
  });

  // Create tag page
  Object.keys(allTags).forEach((tag) => {
    const numPages = Math.ceil(allTags[tag] / postsPerPage);

    Array.from({ length: numPages }).forEach((_f, i) => {
      const options = {
        component: tagsTemplate,
        context: {
          numPages,
          tag,
          currentPage: i + 1,
          limit: postsPerPage,
          skip: i * postsPerPage,
        },
      };
      const tagAsPathFragment = `/tag/${_.kebabCase(tag)}`;

      if (i === 0) {
        createPage({
          ...options,
          path: `${tagAsPathFragment}.html`,
        });
      } else {
        createPage({
          ...options,
          path: `${tagAsPathFragment}${i + 1}.html`,
        });
      }
    });
  });
};

exports.onCreateNode = ({ node, getNode, getNodes, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type !== "MarkdownRemark") {
    return;
  }

  const slug = _resolveSlug(node, getNode);
  const dateForPath = _resolveDateForPath(node);

  createNodeField({
    node,
    name: `slug`,
    value: `/${dateForPath}${slug}.html`,
  });
};

// Create feed per tag
exports.onPostBuild = async ({ graphql }) => {
  const publicPath = `./public`;
  const basePath = path.join(publicPath, `feeds/tags`);

  await fs.ensureDir(basePath);

  const siteResult = await graphql(`
    {
      site {
        siteMetadata {
          author {
            name
          }
          description
          siteUrl
          title
        }
      }
    }
  `);

  const tagsResult = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `);

  const postsResult = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            excerpt(pruneLength: 300)
            html
            frontmatter {
              title
              date
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const tags = new Set(
    tagsResult.data.allMarkdownRemark.edges.flatMap(
      (edge) => edge.node.frontmatter.tags
    )
  );

  const {
    title,
    description,
    siteUrl,
    author,
  } = siteResult.data.site.siteMetadata;

  [...tags].forEach((tag) => {
    const rssFeed = new RSS({
      description,
      author: author.name,
      site_url: siteUrl,
      title: `${title} - ${tag}`,
    });

    postsResult.data.allMarkdownRemark.edges
      .filter((edge) => edge.node.frontmatter.tags.indexOf(tag) > -1)
      .forEach((edge) => {
        const serialized = {
          ...edge.node.frontmatter,
          description: edge.node.excerpt,
          url: siteUrl + edge.node.fields.slug,
          guid: siteUrl + edge.node.fields.slug,
          custom_elements: [{ "content:encoded": edge.node.html }],
        };
        rssFeed.item(serialized);
      });

    const outputPath = path.join(basePath, `${tag}.xml`);
    fs.writeFileSync(outputPath, rssFeed.xml());
  });
};
