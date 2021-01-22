import React from 'react';
import Disqus from 'gatsby-plugin-disqus';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Tags from '../Tags';
import { ShareSns } from '../ShareSns/ShareSns';
import { useAllMarkdownRemarkForPopularList, useSiteMetadata, useTagsList } from '../../hooks';
import InstantView from '../InstantView';
import {
  CARD, HR, SPACER, TEXT_BASE_CENTER, TEXT_GATSBY_LINK, TITLE_H1, TITLE_H2, TITLE_H3
} from '../Tailwind';
import 'twin.macro';
import Iframely from '../Iframely';
import { YYYY_MM_DD } from '../../constants/dateFormat';
import ImageWrap from '../Image/ImageWrap';


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
    <SPACER>
      <TITLE_H3>この記事に関連している記事</TITLE_H3>
      <InstantView flex items={relatedArticles} />
    </SPACER>
  );
};


const Post = ({ post }) => {
  const {
    id, content, slug, socialImage
  } = post;
  const {
    title, category, tags, subscs
  } = post;
  const { url, disqusShortname } = useSiteMetadata();
  const publishedAt = format(new Date(post.published_at), YYYY_MM_DD);
  const updatedDate = post.updated_at
    ? format(new Date(post.updated_at), YYYY_MM_DD)
    : null;

  return (
    <div>
      <Iframely/>
        <SPACER>
          <TEXT_BASE_CENTER>
            <time dateTime={publishedAt}>
              {publishedAt}
            </time>
            {updatedDate && (
                <> (更新日:
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
        <SPACER>
          <div className={'text-md text-center'}>この記事で紹介しているサブスク</div>
          <div className={'flex flex-wrap justify-center'}>
            {subscs && subscs.length > 0 && subscs.map((s, i) => (
              <div className={'bg-base-back m-2 pb-2 rounded'} key={i}>
                <a href={`https://review.subsc.cc/subscs/${s.id}`} target={'_blank'}>
                  <img src={s.socialImage ? s.socialImage.publicURL : '/media/empty.jpg'} className={'w-32 h-20 rounded-t'}/>
                  <div className={'text-xs w-32 truncate text-center mt-1'}>{s.name}</div>
                </a>
              </div>
            ))}
          </div>
        </SPACER>
      <div className='flex justify-center'>
        <ImageWrap item={{ socialImage: socialImage.publicURL }} size={'small'} />
      </div>

      <CARD top>
        <SPACER>
          <ShareSns articleUrl={url + slug} articleTitle={title} />
          <div tw="my-4">
            <ReactMarkdown plugins={[gfm]} className={'content'} source={content}/>
          </div>
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
      <div className='my-4'>
        <TEXT_BASE_CENTER>この記事が面白い、参考になったと思ったらシェアをよろしくお願いします👋</TEXT_BASE_CENTER>
      </div>
      <div className='my-2'>
        <ShareSns articleUrl={url + slug} articleTitle={title} />
      </div>
      <RelatedArticles tags={tags} slug={slug}/>
    </div>
  );
};

export default Post;
