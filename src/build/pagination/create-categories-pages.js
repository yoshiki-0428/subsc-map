module.exports = async (graphql, actions) => {
  const config = require('../../../loadYaml.js');
  const path = require('path');
  const { createPage } = actions;
  const { postsPerPage } = config.siteConfig;

  const result = await graphql(`
    {
      allStrapiArticle {
        group(field: category___name) {
          totalCount
          fieldValue
        }
      }
    }
  `);

  result.data.allStrapiArticle.group.forEach((category) => {
    const numPages = Math.ceil(category.totalCount / postsPerPage);
    const categorySlug = `/categories/${category.fieldValue}`;

    for (let i = 0; i < numPages; i += 1) {
      createPage({
        path: i === 0 ? categorySlug : `${categorySlug}/page/${i}`,
        component: path.resolve('./src/templates/categories-list-template.js'),
        context: {
          category: category.fieldValue,
          currentPage: i,
          postsLimit: postsPerPage,
          postsOffset: i * postsPerPage,
          prevPagePath: i <= 1 ? categorySlug : `${categorySlug}/page/${i - 1}`,
          nextPagePath: `${categorySlug}/page/${i + 1}`,
          hasPrevPage: i !== 0,
          hasNextPage: i !== numPages - 1
        }
      });
    }
  });
};
