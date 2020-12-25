import React from 'react';
import Image from './Image';

const ImageWrap = ({ item }) => {
  if (!item.socialImage) {
    return null;
  }

  return (
      <div className={'relative'}>
        <Image
          resolutions="small"
          alt={item.alt ? item.alt : ''}
          src={item.socialImage}
        />
      </div>
  );
};

export default ImageWrap;
