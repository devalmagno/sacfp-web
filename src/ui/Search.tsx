import { LegacyRef, MutableRefObject, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';

import '../styles/Search.scss';

type SearchProps = {
  handleSearch: (string: string) => void;
}

function Search(props: SearchProps) {
  const inputElement = useRef<HTMLInputElement | null>(null);

  const focusInput = () => {
    inputElement.current?.focus();
  }

  const searchConfig = () => {
    const target = inputElement.current;

    if (target) {
      if (target.value.length < 3) props.handleSearch("");
      else props.handleSearch(target.value);
    }
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
        onChange={searchConfig}
      />
      <div className="search--info">
        <span>Buscar por Nome</span>
        <div className="left--border"></div>
      </div>
    </div>
  )
}

export default Search