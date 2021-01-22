import React, { Component } from 'react';
import { Link } from 'gatsby';
import tw from 'twin.macro';
import { kebabCase } from 'lodash/string';
import { orderBy } from 'lodash/collection';
import SearchBox from '../SearchBox';

const CategoryNavBar = ({ top = true, categories }) => {
  const CategoryNav = tw.div`sm:block hidden inline-block mt-1 mr-4
                             text-lg text-base-font hover:text-primary uppercase
                             border-b-2 hover:border-b-2 hover:border-primary`;
  const categoriesElement = categories.map((category, i) => (
    <CategoryNav key={i} className='border-base-back'>
      <Link key={category.fieldValue} to={`/categories/${category.fieldValue}`}>
        {category.fieldValue}
      </Link>
    </CategoryNav>
  ));
  return (
    <>
      {top && (
        <CategoryNav className={typeof window === 'object' && window.location.pathname === '/' ? 'border-base-font' : 'border-base-back'}>
          <Link to={'/'}>top</Link>
        </CategoryNav>
      )}
      {categoriesElement}
    </>
  );
};

export default class Header extends Component {
  state = {
    active: false
  };

  handleMenuToggle = () => this.setState({ active: !this.state.active });

  handleLinkClick = () => this.state.active && this.handleMenuToggle();

  render() {
    const {
      headerImage,
      categories
    } = this.props;

    const Div = tw.div`bg-base-back`;
    const SvgWrap = tw.div`flex items-center flex-shrink-0 text-black mr-4 cursor-pointer`;
    const Svg = tw.svg`fill-current w-4 h-4 text-base-font hover:text-primary`;

    const sortTotalCount = (items) => orderBy(items, ['totalCount', 'fieldValue'], ['desc']).slice(0, 8);
    const HamburgerMenu = () => (<div>
        {!this.state.active
          && <SvgWrap tw="md:hidden block" onClick={this.handleMenuToggle}>
            <Svg viewBox="0 0 24 24">
              <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/>
            </Svg>
          </SvgWrap>
        }
        {this.state.active
          && <div tw="md:hidden text-center pt-10 w-screen fixed inset-0 z-50 bg-white bg-opacity-75">
            <ul tw="flex items-center flex-col">
              <li tw="ml-6" onClick={this.handleLinkClick}>
                <Svg tw="w-6 h-6 ml-64 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="24" y1="6" x2="6" y2="24"></line>
                  <line x1="6" y1="6" x2="24" y2="24"></line>
                </Svg>
              </li>
              <li>
                <Link
                    tw="block inline-block mt-8 text-xl text-base-font font-bold hover:text-primary uppercase"
                    onClick={this.handleLinkClick}
                    to={'/'}>top
                </Link>
              </li>
              {sortTotalCount(categories).map((category) => (
                  <li key={category.fieldValue}>
                    <Link
                      tw="block inline-block mt-8 text-xl text-base-font font-bold hover:text-primary uppercase"
                      onClick={this.handleLinkClick}
                      to={`/categories/${kebabCase(category.fieldValue)}`}>{category.fieldValue}
                  </Link></li>
              ))}
            </ul>
          </div>
        }
    </div>);

    return (
        <Div>
          <div className="flex justify-between sm:mx-auto max-w-screen-lg mt-6 mb-2 sm:mx-2 mx-1">
            <div className="flex items-center sm:w-8/12 w-6/12">
              <Link to={'/'}>
                <img className="cursor-pointer sm:mr-2 mr-1 sm:w-4/12 w-10/12" src={headerImage} alt={'headerImage'} />
              </Link>
            </div>
            <div className={'sm:block hidden mt-2'}>
              <SearchBox />
            </div>
            <div className={'pb-2 sm:hidden'}>
              <HamburgerMenu />
            </div>
          </div>
          {categories && categories.length > 0 && (
            <div
              className={'sm:flex hidden justify-between mx-auto max-w-screen-lg'}
            >
              <CategoryNavBar categories={categories} top />
            </div>
          )}
        </Div>
    );
  }
}
