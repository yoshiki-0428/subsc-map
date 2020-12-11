import React from 'react';
import tw from 'twin.macro';

import Image from './Image';

const ImageWrap = ({ item, size }) => {
  if (!item.socialImage) {
    return null;
  }

  let Div = null;
  switch (size) {
    case 'normal':
      Div = tw.div`relative h-64`;
      break;
    case 'small':
      Div = tw.div`relative h-20`;
      break;
    default:
      Div = tw.div`relative h-40`;
      break;
  }

  return (
      <Div>
        <Image
          resolutions="small"
          alt={item.alt ? item.alt : ''}
          src={item.socialImage}
        />
      </Div>
  );
};

export default ImageWrap;
