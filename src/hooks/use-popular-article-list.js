import { useStaticQuery, graphql } from 'gatsby';
import getOgpImage from '../utils/get-ogp-image';

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

  console.log(paths);
  console.log(allStrapiArticle.nodes
    .filter((a) => paths.includes(a.slug)), allStrapiArticle.nodes);

  const list = allStrapiArticle.nodes
    .filter((a) => paths.includes(a.slug))
    .map((a) => ({
      title: a.title,
      socialImage: a.socialImage ? a.socialImage.publicURL : getOgpImage(a.title),
      slug: a.slug
    }));
  console.log(list);

  return list;
};

export default useAllMarkdownRemarkForPopularList;
