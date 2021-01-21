import React from 'react';
import { Link } from 'gatsby';
import { orderBy } from 'lodash/collection';
import { kebabCase } from 'lodash/string';
import tw from 'twin.macro';

const sortTotalCount = (tags) => orderBy(tags, ['totalCount', 'fieldValue'], ['desc']);

const Tags = ({ tags, urlPrefix }) => {
  if (!tags) {
    return null;
  }
  const Tag = tw.span`inline-block bg-base-back rounded-full m-1 mr-2 mb-2
   px-3 py-1 text-xs text-base-font cursor-pointer`;

  return (
      <>
        {sortTotalCount(tags).map((tag) => (
            <Link key={tag.fieldValue} to={`/${urlPrefix}/${kebabCase(tag.fieldValue)}`}>
              <Tag>{tag.fieldValue}</Tag>
            </Link>
        ))}
      </>
  );
};

export default Tags;
