import { useStaticQuery, graphql } from 'gatsby';

const useCategoriesList = () => {
  const { allStrapiArticle } = useStaticQuery(
    graphql`
      query CategoriesListQuery {
          allStrapiArticle {
              group(field: category___name) {
                  fieldValue
                  totalCount
              }
          }
      }
    `
  );

  return allStrapiArticle.group;
};

export default useCategoriesList;
