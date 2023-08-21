import { useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

import '../styles/Search.scss';
import { toCapitalize } from '../utils';

type SearchProps = {
  handleSearch: (title: string, string: string) => void;
  style?: any;
}

function Search(props: SearchProps) {
  const [title, setTitle] = useState("Professor");
  const [showSearchOptions, setShowSearchOptions] = useState(false);

  const titleList = ["Professor", "Disciplina", "Curso", "Dia"];

  const inputElement = useRef<HTMLInputElement | null>(null);

  const style = {
    width: 'auto',
    ...props.style
  }

  const titleElements = titleList.map(elem => {
    if (elem === title) return;

    return (
      <li onClick={() => setTitle(elem)}>
        Buscar por {elem}
      </li>
    )
  })

  const focusInput = () => {
    inputElement.current?.focus();
  }

  const searchConfig = () => {
    const target = inputElement.current;


    if (target) {
      if (target.value.length < 3) props.handleSearch(title, "");
      else props.handleSearch(title, target.value);
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
      <div
        className="search--info"
        onClick={() => setShowSearchOptions(prevState => !prevState)}
      >
        <span>Buscar por {title}</span>
        <div className="left--border"></div>
        {showSearchOptions && (
          <ul>
            {titleElements}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Search