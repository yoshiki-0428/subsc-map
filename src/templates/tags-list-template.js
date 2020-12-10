import React from 'react';
import { graphql } from 'gatsby';
import { useSiteMetadata } from '../hooks';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import Feed from '../components/Feed';

const TagsListTemplate = ({ data, pageContext }) => {
  const { title, subtitle } = useSiteMetadata();
  const { edges } = data.allStrapiArticle;

  const pageTitle = pageContext.tag === '*' ? '' : `${pageContext.tag}に関する記事一覧`;
  const mainPage = (
      <Page title={pageTitle} content={(
        <Feed edges={edges} />
      )}>
      </Page>
  );

  const side = <Sidebar/>;

  return (
    <Layout main={mainPage} side={side} title={`Tags - ${title}`} description={subtitle} />
  );
};

export const query = graphql`
query TagsListTemplate($tag: String!) {
    allStrapiArticle(filter: {tags: {elemMatch: {id: {}, name: {glob: $tag}}}}, sort: {fields: updated_at, order: DESC}) {
        edges {
            node {
                title
                created_at
                updated_at
                published_at
                slug
                category {
                    id
                    name
                }
                tags {
                    id
                    name
                }
                socialImage {
                    publicURL
                }
            }
        }
    }
}
`;

export default TagsListTemplate;
