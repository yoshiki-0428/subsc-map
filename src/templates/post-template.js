import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';
import Sidebar from '../components/Sidebar';
import 'twin.macro';
import getOgpImage from '../utils/get-ogp-image';

const PostTemplate = ({ data }) => {
  const { title, subtitle } = useSiteMetadata();
  const { title: postTitle, socialImage } = data.strapiArticle;
  const metaDescription = subtitle;

  const main = <Post post={data.strapiArticle} />;
  const side = <Sidebar />;
  const origin = window && window.location.origin;
  return (
    <Layout main={main}
            side={side}
            title={`${postTitle} - ${title}`}
            description={metaDescription}
            socialImage={socialImage
              ? origin + socialImage.publicURL
              : getOgpImage(postTitle)} />
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
