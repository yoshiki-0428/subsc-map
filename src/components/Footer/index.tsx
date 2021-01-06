// @ts-ignore
import React from 'react';
import { Link } from 'gatsby';

export type DisplayList = {
  name: string;
  to: string;
  count?: number;
}

type Props = {
  title: string;
  list: DisplayList[];
};

const FOOTER_NAV_LIST: { title: string; list: DisplayList[] }[] = [
  {
    title: 'みんなのサブスク',
    list: [
      { name: 'ブログ', to: 'https://subsc.cc' },
      { name: 'レビューサイト', to: 'https://review.subsc.cc' },
      { name: '検索をする', to: '/search' },
    ],
  },
  {
    title: '利用者の方へ',
    list: [
      { name: 'すべての記事', to: '/' },
      { name: 'サブスクの検索', to: '/search' },
    ],
  },
  {
    title: 'ヘルプとガイド',
    list: [
      { name: 'サブスクをリクエスト', to: 'https://forms.gle/9f41qcudxtDBD2NQA' },
      { name: 'お問い合わせ', to: 'https://forms.gle/6attzRHNFLk9YTKQ8' },
    ],
  },
];

const START_YEAR: string = `2020 ~ ${new Date().getFullYear()}`;

const FooterNav: React.FC<Props> = (props: Props) => (
  <div className={'p-8'}>
    <h4 className={'mb-3 font-bold'}>{props.title}</h4>
    <ul className={'text-gray-300'}>
      {props.list
      && props.list.map((value, i) => (
        <li key={i} className={'my-1'}>
          {!value.to.indexOf('http') ? (
            <a target="_blank" href={value.to}>{value.name}</a>
          ) : (
            <Link to={value.to}>{value.name}</Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => (
  <footer className="bg-base-footer text-white">
    <div className={'md:flex xs:flex-col justify-center'}>
      {FOOTER_NAV_LIST.map((f, i) => (
        <FooterNav key={i} title={f.title} list={f.list} />
      ))}
    </div>

    <p className="p-5 text-center text-sm text-gray-300">
      Copyright © {START_YEAR} みんなのサブスク ブログ All Rights Reserved.
    </p>
  </footer>
);

export default Footer;
