import { useStaticQuery, graphql } from 'gatsby';

const useAllMarkdownRemarkForPopularList = (paths) => {
  const { allStrapiArticle } = useStaticQuery(
    graphql`
      query AllMarkdownRemarkForPopular {
          allStrapiArticle {
              nodes {
                  slug
                  title
                  socialImage {
                      publicURL
                  }
              }
          }
      }`
  );

  const list = allStrapiArticle.nodes
    .filter((a) => paths.includes(a.slug))
    .map((a) => ({
      title: a.title,
      socialImage: a.socialImage.publicURL,
      slug: a.slug
    }));

  return list;
};

export default useAllMarkdownRemarkForPopularList;
