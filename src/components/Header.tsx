import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiDotsVerticalRounded, BiEdit, BiLogOut, BiX, BiArrowBack } from "react-icons/bi";

import { Select } from '../ui/index';

import { routes as navBar } from '../services/routes';

import '../styles/Header.scss';
import { useDataContext } from '../contexts';
import { toCapitalizeFirstLetters } from '../utils';

type HeaderProps = {
  pageTitle: string;
  setPageTitle: (string: string) => void;
}

function Header(props: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { config } = useDataContext();

  const navigation = useNavigate();

  const navBarElements = navBar.map(route => {
    if (!route.navbar) return;

    return (
      <li
        key={route.path}
        onClick={() => handlePageNavigation(route.title)}
        className={props.pageTitle == route.title ? 'selected' : ''}
      >
        {props.pageTitle == route.title ?
          <strong>{route.title.toUpperCase()}</strong> :
          <Link to={route.path}>
            <span>
              {route.title.toUpperCase()}
            </span>
          </Link>
        }
        <div className='highlight'></div>
      </li>
    );
  })

  const bottomMenuOptions = [
    {
      title: 'mudar senha',
      icon: <BiEdit className="menu__icon" />,
      func: () => null,
    },
    {
      title: 'sair',
      icon: <BiLogOut className="menu__icon" />,
      func: () => null,
    },
  ];
  const bottomMenuElements = bottomMenuOptions.map(option => (
    <div>
      <div className="hr logout" onClick={option.func}>
        {option.icon}
        <span>{option.title.toUpperCase()}</span>
      </div>
    </div>
  ));

  function toggleBottomMenu() {
    setIsMenuOpen(state => !state);
  }

  function handlePageNavigation(pageTitle: string) {
    props.setPageTitle(pageTitle);
  }

  function goBackNavigation() {
    navigation(-1);

  }

  return (
    <div id="under" className="container_header">
      <div className="header__info">
        <div className="header--title">
          <h3>Sistema de Gestão e Criação de Folhas de Ponto</h3>
          <span>Departamento de {toCapitalizeFirstLetters(config.departament)}</span>
        </div>
        <div className="header__menu">
          <span>Conectado como <strong>John Doe</strong></span>
          <Select />
          <div className="container__menu" onClick={toggleBottomMenu}>
            <BiDotsVerticalRounded size={24} />
          </div>
        </div>
      </div>
      <nav className="header__nav">
        {props.pageTitle != 'tela inicial' && (
          <div className="header__go_back" onClick={goBackNavigation}>
            <BiArrowBack fill="#fff" className='go_back__icon' />
            <span>Voltar</span>
          </div>
        )}
        <ul>
          {navBarElements}
        </ul>
      </nav>

      <div className="menu__options" style={
        isMenuOpen ? { display: "flex " } :
          { display: 'none' }
      }>
        <div className="menu__close" onClick={toggleBottomMenu}>
          <BiX size={24} />
        </div>
        <div className='option'>
          <div className="hr">
            <BiEdit className="menu__icon" />
            <span>MUDAR SENHA</span>
          </div>
        </div>
        <div className='option'>
          <div className="hr logout">
            <BiLogOut className="menu__icon" />
            <span>SAIR</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Header