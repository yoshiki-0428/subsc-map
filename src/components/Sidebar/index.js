import React from 'react';
import { useCategoriesList, usePopularList, useTagsList } from '../../hooks';
import Tags from '../Tags';
import Author from '../Author';
import Adsense from '../Adsense';
import InstantView from '../InstantView';
import {
  CARD, HR, SPACER, TITLE_H3
} from '../Tailwind';
import 'twin.macro';
import SearchBox from '../SearchBox';

const SideBar = ({ toc }) => {
  const popularList = usePopularList();
  const tags = useTagsList();
  const categories = useCategoriesList();

  return (
    <div>
      <CARD>
        <SPACER>
          <Author />
        </SPACER>
      </CARD>

      {popularList.length > 0 && (
        <div className='py-2'>
          <div className={'pl-2 my-4 text-xl font-bold border-l-4 border-primary'}>よく読まれている記事</div>
          <InstantView items={popularList}/>
        </div>
      )}
      <div className='py-2'>
        <div className={'pl-2 my-4 text-xl font-bold border-l-4 border-primary'}>記事を探す</div>
        <div className={'flex justify-left ml-0'}>
          <SearchBox q={''}/>
        </div>
      </div>

      <div className='py-2'>
        <div className={'pl-2 my-4 text-xl font-bold border-l-4 border-primary'}>カテゴリ一</div>
        <Tags tags={categories} urlPrefix={'categories'}/>
      </div>
      <div className='py-2'>
        <div className={'pl-2 my-4 text-xl font-bold border-l-4 border-primary'}>タグ一覧</div>
        <Tags tags={tags} urlPrefix={'tags'}/>
      </div>

      {toc && (
          <div tw="hidden lg:block sticky top-1/5">
            <CARD>
              <SPACER>
                <TITLE_H3>目次</TITLE_H3>
                <HR/>
                {toc}
              </SPACER>
            </CARD>
          </div>
      )}
    </div>
  );
};

export default SideBar;
