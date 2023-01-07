import { useState } from 'react';
import { BiDotsVerticalRounded, BiEdit, BiLogOut, BiX, BiArrowBack } from "react-icons/bi";

import { Select } from '../ui/index';

import '../styles/Header.scss';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('Tela Inicial');

  const navBar = ['Tela Inicial', 'Planilhas', 'Folhas de Ponto', 'Calendário Letivo', 'Configurações'];
  const navBarElements = navBar.map(title => (
    <li
      key={title}
      onClick={() => handlePageNavigation(title)}
      className={pageTitle == title ? 'selected' : ''}
    >
      {pageTitle == title ?
        <strong>{title.toUpperCase()}</strong> :
        <span>{title.toUpperCase()}</span>
      }
      <div className='highlight'></div>
    </li>
  ));

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
    setPageTitle(pageTitle);
  }

  return (
    <div className="container_header">
      <div className="header__info">
        <h3>Sistema de Gestão e Criação de Folhas de Ponto</h3>
        <div className="header__menu">
          <span>Logado como <strong>John Doe</strong></span>
          <Select />
          <div className="container__menu" onClick={toggleBottomMenu}>
            <BiDotsVerticalRounded size={24} />
          </div>
        </div>
      </div>
      <nav className="header__nav">
        {pageTitle != 'Tela Inicial' && (
          <div className="header__go_back">
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