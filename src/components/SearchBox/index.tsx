// @ts-ignore
import React, { useState } from 'react';
import { navigate } from 'gatsby';

const SearchBox: React.FC = ({ q = '' }) => {
  const [word, setWord] = useState(q || '');

  const onKeyDownEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate(`/search?q=${word}`);
    }
  };

  const onChangeInput = (e) => {
    setWord(String(e.target.value));
  };

  return (
    <div className="w-56 h-10 p-1 bg-white border rounded flex relative">
      <input
        type="text"
        name="search"
        placeholder="記事を検索"
        onChange={onChangeInput}
        onKeyDown={onKeyDownEnter}
        className="base-input"
        value={word}
      />
      <button
        type="submit"
        className="absolute right-0 mt-1 mr-1"
        onClick={() => navigate(`/search?q=${word}`)}>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
          <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z"/>
        </svg>
      </button>

    </div>
  );
};

export default SearchBox;
