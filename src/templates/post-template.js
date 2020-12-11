import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';
import Sidebar from '../components/Sidebar';
import 'twin.macro';

const PostTemplate = ({ data }) => {
  const { title, subtitle } = useSiteMetadata();
  // TODO excerpt
  const { excerpt, title: postTitle, socialImage } = data.strapiArticle;

  const metaDescription = subtitle;

  const main = <Post post={data.strapiArticle} />;
  // const toc = <div className={'toc'} dangerouslySetInnerHTML={{ __html: data.markdownRemark.tableOfContents }}/>;
  const side = <Sidebar />;
  return (
    <Layout main={main}
            side={side}
            title={`${postTitle} - ${title}`}
            description={metaDescription}
            socialImage={socialImage} />
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
      strapiArticle(slug: {eq: $slug}) {
          id
          created_at
          updated_at
          published_at
          slug
          title
          content
          tags {
              id
              name
          }
          subscs {
              id
              name
              socialImage {
                  publicURL
              }
          }
          socialImage {
              publicURL
          }
          category {
              id
              name
          }
      }
  }
`;

export default PostTemplate;
