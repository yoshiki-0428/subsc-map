import React, { Component } from 'react';
import { Link } from 'gatsby';
import tw from 'twin.macro';
import { kebabCase } from 'lodash/string';
import { orderBy } from 'lodash/collection';
import SearchComponent from '../SearchBox';

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

    const StickyDiv = tw.div`lg:sticky lg:top-0 lg:z-50 bg-white shadow-lg`;
    const Nav = tw.nav`flex items-center justify-end flex-wrap container mx-auto px-8`;
    const SvgWrap = tw.div`flex items-center flex-shrink-0 text-black mr-4 cursor-pointer`;
    const Svg = tw.svg`fill-current w-4 h-4 text-base-font hover:text-primary`;
    const Content = tw.div`hidden md:w-1/2 md:flex-grow md:flex md:items-center`;
    const ContentInner = tw.div`text-base flex-grow flex-grow`;

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
        <StickyDiv>
          {headerImage && (
            <span tw="flex justify-between">
              <div/>
              <Link to={'/'}>
                <img tw="p-4 pb-0 h-20 md:h-24 lg:h-24 xl:h-24" src={headerImage} alt={'headerImage'} />
              </Link>
              <div/>
            </span>
          )}
          {!headerImage && (<div tw={'mt-4'}/>)}

          <Nav>
            <div className={'pb-4'}>
              <HamburgerMenu />
            </div>

            <Content>
              <ContentInner>
                <Link
                  tw="block inline-block mt-1 mr-4 text-xl text-base-font hover:text-primary border-b-4 border-white hover:border-b-4 hover:border-primary uppercase"
                  to={'/'}>
                  top
                </Link>
                {sortTotalCount(categories).map((category) => (
                    <Link
                        tw="block inline-block mt-1 mr-4 text-xl text-base-font hover:text-primary border-b-4 border-white hover:border-b-4 hover:border-primary uppercase"
                        key={category.fieldValue} to={`/categories/${kebabCase(category.fieldValue)}`}>
                      {category.fieldValue}
                    </Link>
                ))}
              </ContentInner>
            </Content>
          </Nav>
        </StickyDiv>
    );
  }
}
