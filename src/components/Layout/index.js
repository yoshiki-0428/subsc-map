import React from 'react';
import Helmet from 'react-helmet';
import tw from 'twin.macro';
import { Link } from 'gatsby';
import { useAllMarkdownRemarkForPopularList, useSiteMetadata, useCategoriesList } from '../../hooks';
import ImageWrap from '../Image/ImageWrap';
import { SPACER, TEXT_GATSBY_LINK_H3 } from '../Tailwind';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({
  main,
  side,
  title,
  description,
  socialImage,
  top = false
}) => {
  const {
    author, topContents, headerImage
  } = useSiteMetadata();
  const siteTitle = useSiteMetadata().title;
  const categories = useCategoriesList();
  const items = useAllMarkdownRemarkForPopularList(topContents.map((top) => top.url));

  const Div = tw.div`flex flex-col min-h-screen bg-base-back`;
  const Main = tw.div`container mx-auto`;
  const Body = tw.div`w-11/12 grid grid-cols-12 lg:gap-10 gap-6 sm:pt-10 py-10 mx-auto`;
  const Article = tw.div`lg:col-span-8 col-span-12`;
  const Side = tw.div`lg:col-span-4 col-span-12`;

  return (
    <Div>
      <Header headerImage={headerImage} categories={categories}/>

      <Main>
        <Body>
          {top && items.length === 3 && (<TopContents items={items} />)}
          <Article>{main}</Article>
          <Side>{side}</Side>
        </Body>
      </Main>

      <Footer />
      <Helmet>
        <html lang="ja" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link rel="preconnect dns-prefetch" href="https://ucarecdn.com" crossOrigin/>
        <link rel="preconnect dns-prefetch" href="https://ad.doubleclick.net" />
        <link rel="preconnect dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect dns-prefetch" href="https://www.googletagservices.com" />
        <link rel="preconnect dns-prefetch" href="https://tpc.googlesyndication.com" />
        <link rel="preconnect dns-prefetch" href="https://www.google.com" />
        <link rel="preconnect dns-prefetch" href="https://tpc.googlesyndication.com" />
        <link rel="preconnect dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect dns-prefetch" href="https://b.st-hatena.com" />

        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={top ? 'website' : 'article'} />
        <meta property="og:url" content={typeof window === 'object' ? window.location.href : ''} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:site_name" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={'@minna_subsc'} />
        <meta name="twitter:url" content={typeof window === 'object' ? window.location.href : ''} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialImage} />
      </Helmet>
    </Div>
  );
};

const TopContents = ({ items }) => {
  const TopContent = tw.div`lg:col-span-4 col-span-12 bg-white shadow-lg rounded`;

  return (
      <>
        {items.slice(0, 3).map((item) => (
            <TopContent key={item.slug}>
              <div tw="rounded-tr rounded-tl overflow-hidden bg-white">
                <Link to={item.slug}>
                  <ImageWrap item={{ socialImage: item.socialImage, alt: '' }}/>
                </Link>
              </div>
              <SPACER>
                <TEXT_GATSBY_LINK_H3 to={item.slug}>{item.title}</TEXT_GATSBY_LINK_H3>
              </SPACER>
            </TopContent>
        ))}
      </>
  );
};

export default Layout;
