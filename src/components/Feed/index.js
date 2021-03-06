import React from 'react';
import { Link } from 'gatsby';
import { format } from 'date-fns';
import Tags from '../Tags';
import ImageWrap from '../Image/ImageWrap';
import {
  CARD,
  SPACER, SPACER_MINI,
  TEXT_BASE_CENTER, TEXT_BASE_CENTER_LINK,
  TEXT_GATSBY_LINK,
  TEXT_GATSBY_LINK_H2,
} from '../Tailwind';
import { YYYY_MM_DD } from '../../constants/dateFormat';
import getOgpImage from '../../utils/get-ogp-image';

const Feed = ({ edges }) => (
      <div className={'grid grid-cols-12 lg:gap-10 gap-6'}>
        {edges.map((edge) => (
          <div className={'lg:col-span-6 col-span-12'} key={edge.node.slug}>
            <CARD>
              <SPACER>
                <TEXT_BASE_CENTER>
                  <time dateTime={format(new Date(edge.node.published_at), YYYY_MM_DD)}>
                    {format(new Date(edge.node.published_at), YYYY_MM_DD)}
                  </time>
                  {edge.node.updated_at && format(new Date(edge.node.updated_at), YYYY_MM_DD)
                    !== format(new Date(edge.node.published_at), YYYY_MM_DD)
                    && (
                      <> (更新日:
                        <time
                          dateTime={
                            format(new Date(edge.node.updated_at), YYYY_MM_DD)}>
                          {format(new Date(edge.node.updated_at), YYYY_MM_DD)}
                        </time>
                        )
                      </>
                    )}
                </TEXT_BASE_CENTER>
                <TEXT_GATSBY_LINK_H2 to={`/posts/${edge.node.slug}`}>
                  {edge.node.title}
                </TEXT_GATSBY_LINK_H2>

                <TEXT_GATSBY_LINK to={`/categories/${edge.node.category.name}`}>
                  {edge.node.category.name}
                </TEXT_GATSBY_LINK>
              </SPACER>
              <Link to={`/posts/${edge.node.slug}`}>
                <ImageWrap item={{
                  socialImage: edge.node.socialImage
                    ? edge.node.socialImage.publicURL
                    : getOgpImage(edge.node.title)
                }} />
              </Link>
              <SPACER>
                <TEXT_BASE_CENTER_LINK to={`/posts/${edge.node.slug}`}>
                  {edge.node.excerpt ? edge.node.excerpt : edge.node.title }
                </TEXT_BASE_CENTER_LINK>
              </SPACER>
              <SPACER_MINI>
                <Tags tags={edge.node.tags.map((t) => ({ fieldValue: t.name }))} urlPrefix={'tags'}/>
              </SPACER_MINI>
            </CARD>
          </div>
        ))}
      </div>
);

export default Feed;
