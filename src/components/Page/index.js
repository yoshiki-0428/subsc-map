import React from 'react';
import tw from 'twin.macro';

const Page = ({ title, content, footerContent }) => {
  const Body = tw.div`text-base flex justify-center`;
  return (
      <>
        {title && (
          <>
            <div className='ml-4 mb-8 pl-4 sm:text-2xl text-xl font-bold border-l-4 border-primary'>{title}</div>
          </>
        )}

        <Body>
          {content}
        </Body>
        <div>
          {footerContent}
        </div>
      </>
  );
};

export default Page;
