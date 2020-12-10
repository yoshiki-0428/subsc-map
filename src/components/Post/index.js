import React from 'react';
import Disqus from 'gatsby-plugin-disqus';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Tags from '../Tags';
import { ShareSns } from '../ShareSns/ShareSns';
import { useAllMarkdownRemarkForPopularList, useSiteMetadata, useTagsList } from '../../hooks';
import ImageWrap from '../Image/ImageWrap';
import InstantView from '../InstantView';
import {
  CARD, HR, SPACER, TEXT_BASE_CENTER, TEXT_GATSBY_LINK, TITLE_H1, TITLE_H3
} from '../Tailwind';
import 'twin.macro';
import Iframely from '../Iframely';
import { YYYY_MM_DD } from '../../constants/dateFormat';

// Tag Listから自分以外のタグで関連するURLを抽出
const RelatedArticles = ({ tags, slug }) => {
  const group = useTagsList();
  const tagIds = tags.map((t) => t.name);
  const relatedLinks = group.filter((g) => tagIds.includes(g.fieldValue))
    .flatMap((g) => g.edges)
    .map((edge) => edge.node.slug)
    .filter((url) => url !== slug);
  const relatedArticles = relatedLinks
    ? useAllMarkdownRemarkForPopularList(Array.from(new Set(relatedLinks)))
    : [];

  if (relatedArticles.length === 0) {
    return null;
  }
  return (
    <CARD>
      <SPACER>
        <TITLE_H3>Related Links</TITLE_H3>
        <HR/>
        <InstantView flex items={relatedArticles} />
      </SPACER>
    </CARD>
  );
};


const Post = ({ post }) => {
  const { id, content, slug } = post;
  const {
    title, socialImage, category, tags
  } = post;
  const { url, disqusShortname } = useSiteMetadata();
  const date = format(new Date(post.published_at), YYYY_MM_DD);
  const updatedDate = post.updated_at
    ? format(new Date(post.updated_at), YYYY_MM_DD)
    : null;

  return (
    <div>
      <Iframely/>
      <CARD mb>
        <SPACER>
          <TEXT_BASE_CENTER>
            <time dateTime={date}>
              {date}
            </time>
            {updatedDate && (
                <>(更新日:
                    <time dateTime={updatedDate}>
                      {updatedDate}
                    </time>
                  )
                </>
            )}
          </TEXT_BASE_CENTER>

          <TITLE_H1>{title}</TITLE_H1>
          <TEXT_GATSBY_LINK to={`/categories/${category.name}`}>{category.name}</TEXT_GATSBY_LINK>
        </SPACER>
      </CARD>
      <ImageWrap item={{ socialImage: socialImage.publicURL }} size={'normal'} />
      <CARD top>
        <SPACER>
          <ShareSns articleUrl={url + slug} articleTitle={title} />
          <div tw="my-4">
            <ReactMarkdown plugins={[gfm]} className={'content'} source={content}/>
          </div>
          <Tags tags={tags.map((tag) => ({ fieldValue: tag.name }))} urlPrefix={'tags'} />
          <ShareSns articleUrl={url + slug} articleTitle={title} />
        </SPACER>
      </CARD>

      {disqusShortname
          && <CARD>
            <SPACER>
              <Disqus
                  identifier={id}
                  title={title}
                  url={url + slug}
              />
            </SPACER>
          </CARD>
      }
      <RelatedArticles tags={tags} slug={slug}/>
    </div>
  );
};

export default Post;
