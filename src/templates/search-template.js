import React from 'react';
import { graphql } from 'gatsby';
import Fuse from 'fuse.js';
import { useQueryParam } from 'gatsby-query-params';
import { useSiteMetadata } from '../hooks';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import SearchBox from '../components/SearchBox';

const SEARCH_OPTIONS = {
  threshold: 0.3,
  caseSensitive: false,
  keys: [
    'node.title',
    'node.content',
    'node.published_at',
    'node.created_at',
    'node.updated_at',
    'node.slug',
    'node.category.name',
    'node.tags.name'
  ]
};

const SearchTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle, socialMediaCard } = useSiteMetadata();

  const { edges } = data.allStrapiArticle;
  console.log(edges);
  const q = useQueryParam('q', '');
  const fuse = new Fuse(edges, SEARCH_OPTIONS);
  const result = q ? fuse.search(q) : edges.map((e) => ({ item: e }));

  const mainPage = (
    <Page content={
      <div>
        <div className={'flex justify-center ml-0 mb-6'}>
          <SearchBox q={q} />
        </div>
        {result.length === 0 && (
          <>
            <div className='flex justify-center'>
              <img src={'/media/no_result.svg'} className={'w-32'}/>
            </div>
            <div className='my-4 text-center'>
              記事が見つかりませんでした。
            </div>
            <Feed edges={edges} />
          </>
        )}
        <Feed edges={result.map((r) => r.item)} />
      </div>
    }/>
  );

  const side = <Sidebar />;

  return (
    <Layout main={mainPage}
            side={side}
            socialImage={socialMediaCard.image}
            title={siteTitle}
            description={siteSubtitle} />
  );
};

export const query = graphql`
  query SearchTemplate {
      allStrapiArticle
      (
          sort: { fields: updated_at, order: DESC }
      )
      {
          group(field: tags___name) {
              fieldValue
              totalCount
          }
          edges {
              node {
                  title
                  content
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

export default SearchTemplate;
