const path = require('path');
const get = require('lodash/get');
const createCategoriesPages = require('./pagination/create-categories-pages.js');
const createTagsPages = require('./pagination/create-tags-pages.js');
const createPostsPages = require('./pagination/create-posts-pages.js');

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // 404
  createPage({
    path: '/404',
    component: path.resolve('./src/templates/not-found-template.js')
  });

  // Tags list
  createPage({
    path: '/tags',
    component: path.resolve('./src/templates/tags-list-template.js'),
    context: { tag: '*' }
  });

  // Categories list
  createPage({
    path: '/categories',
    component: path.resolve('./src/templates/categories-list-template.js'),
    context: { category: '*' }
  });

  // Search
  createPage({
    path: '/search',
    component: path.resolve('./src/templates/search-template.js'),
  });

  // Posts from markdown
  const result = await graphql(`
  {
    allStrapiArticle {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);

  const { edges } = result.data.allStrapiArticle;

  edges.forEach((edge) => {
    createPage({
      path: `posts/${edge.node.slug}`,
      component: path.resolve('./src/templates/post-template.js'),
      context: { slug: edge.node.slug }
    });
  });

  // Feeds
  await createTagsPages(graphql, actions);
  await createCategoriesPages(graphql, actions);
  await createPostsPages(graphql, actions);
};


module.exports = createPages;
