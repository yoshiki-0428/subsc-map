import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  const mainPage = (
      <Page title="NOT FOUND" content={<p>404 Not Found お探しのページは見つまりませんでした。</p>}/>
  );

  const side = <Sidebar/>;

  return (
    <Layout main={mainPage} side={side} title={`Not Found - ${title}`} description={subtitle} />
  );
};

export default NotFoundTemplate;
