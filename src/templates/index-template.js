import React from 'react';
import { graphql } from 'gatsby';
import { useSiteMetadata } from '../hooks';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import Pagination from '../components/Pagination';

const IndexTemplate = ({ data, pageContext }) => {
  const { title: siteTitle, subtitle: siteSubtitle, socialMediaCard } = useSiteMetadata();

  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath
  } = pageContext;

  const { edges } = data.allStrapiArticle;
  const pageTitle = currentPage > 0 ? `Posts - Page ${currentPage} - ${siteTitle}` : siteTitle;

  const mainPage = (
    <Page content={
      <div>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </div>
    }/>
  );

  const side = <Sidebar />;

  return (
    <Layout main={mainPage}
            side={side}
            socialImage={socialMediaCard.image}
            title={pageTitle}
            description={siteSubtitle} top/>
  );
};

export const query = graphql`
  query IndexTemplate($postsLimit: Int!, $postsOffset: Int!) {
    allStrapiArticle
    (
        limit: $postsLimit,
        skip: $postsOffset,
        sort: { fields: updated_at, order: DESC }
    ) 
    {
      group(field: tags___id) {
        fieldValue
        totalCount
      }
      edges {
        node {
          title
          published_at
          created_at
          updated_at
          slug
          socialImage {
            publicURL
          }
          category {
            id
            name
          }
          tags {
            id
            name
          }
        }
      }
    }
  }
`;

export default IndexTemplate;
