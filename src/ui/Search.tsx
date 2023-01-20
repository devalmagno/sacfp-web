import { LegacyRef, MutableRefObject, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';

import '../styles/Search.scss';

function Search() {
  const inputElement = useRef<HTMLInputElement | null>(null);

  const focusInput = () => {
    inputElement.current?.focus();
  }

  return (
    <div className="container--search" onClick={focusInput}>
        <BiSearch fill="#B79EA7" size={24} />
        <input 
          type="text" 
          placeholder='Pesquisar... '
          autoComplete='off'
          spellCheck='false'
          ref={inputElement}   
        />
        <div className="search--info">
            <span>Nome ou Masp</span>
            <div className="left--border"></div>
        </div>
    </div>
  )
}

export default Search