import { LegacyRef, MutableRefObject, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';

import '../styles/Search.scss';
import { toCapitalize } from '../utils';

type SearchProps = {
  handleSearch: (string: string) => void;
  style?: any;
  title: string;
}

function Search(props: SearchProps) {
  const inputElement = useRef<HTMLInputElement | null>(null);

  const title = toCapitalize(props.title);

  const style = {
    width: 'auto',
    ...props.style
  }

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
    <div className="container--search" onClick={focusInput} style={style}>
      <div className="icon">
        <BiSearch fill="#B79EA7" size={24} />
      </div>
      <input
        type="text"
        placeholder='Pesquisar... '
        autoComplete='off'
        spellCheck='false'
        ref={inputElement}
        onChange={searchConfig}
      />
      {inputElement.current?.value === '' && (
        <div className="search--info">
          <span>Buscar por {title}</span>
          <div className="left--border"></div>
        </div>
      )}
    </div>
  )
}

export default Search