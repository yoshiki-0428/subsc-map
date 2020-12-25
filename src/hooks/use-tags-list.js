import { useStaticQuery, graphql } from 'gatsby';

const useTagsList = () => {
  const { allStrapiArticle } = useStaticQuery(
    graphql`
      query TagsListQuery {
          allStrapiArticle {
              group(field: tags___name) {
                  fieldValue
                  totalCount
                  edges {
                      node {
                          slug
                      }
                  }
              }
          }
      }
    `
  );

  return allStrapiArticle.group;
};

export default useTagsList;
