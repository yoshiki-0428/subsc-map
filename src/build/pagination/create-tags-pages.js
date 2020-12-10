const { kebabCase } = require('lodash/string');
const path = require('path');
const config = require('../../../loadYaml.js');

module.exports = async (graphql, actions) => {
  const { createPage } = actions;
  const { postsPerPage } = config.siteConfig;

  const result = await graphql(`
    {
      allStrapiArticle {
        group(field: tags___id) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  result.data.allStrapiArticle.group.forEach((tag) => {
    const numPages = Math.ceil(tag.totalCount / postsPerPage);
    const tagSlug = `/tags/${tag.fieldValue}`;

    for (let i = 0; i < numPages; i += 1) {
      createPage({
        path: i === 0 ? tagSlug : `${tagSlug}/page/${i}`,
        component: path.resolve('./src/templates/tags-list-template.js'),
        context: {
          tag: tag.fieldValue,
          currentPage: i,
          postsLimit: postsPerPage,
          postsOffset: i * postsPerPage,
          prevPagePath: i <= 1 ? tagSlug : `${tagSlug}/page/${i - 1}`,
          nextPagePath: `${tagSlug}/page/${i + 1}`,
          hasPrevPage: i !== 0,
          hasNextPage: i !== numPages - 1
        }
      });
    }
  });
};
