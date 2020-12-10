import React from 'react';
import { graphql } from 'gatsby';
import { useSiteMetadata } from '../hooks';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import Feed from '../components/Feed';

const CategoriesListTemplate = ({ data, pageContext }) => {
  const { title, subtitle } = useSiteMetadata();
  const { edges } = data.allStrapiArticle;

  const pageTitle = pageContext.category === '*' ? '' : `${pageContext.category}に関する記事一覧`;
  const mainPage = (
    <Page title={pageTitle} content={(
      <Feed edges={edges} />
    )}>
    </Page>
  );

  const side = <Sidebar/>;

  return (
    <Layout main={mainPage} side={side} title={`Categories - ${title}`} description={subtitle}/>
  );
};

export const query = graphql`
    query CategoriesListTemplate($category: String!) {
        allStrapiArticle(sort: {fields: updated_at, order: DESC}, filter: {category: {name: {glob: $category}}}) {
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

export default CategoriesListTemplate;
