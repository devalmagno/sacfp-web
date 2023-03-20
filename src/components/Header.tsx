import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiDotsVerticalRounded, BiEdit, BiLogOut, BiX, BiArrowBack } from "react-icons/bi";

import { Select } from '../ui/index';

import { routes as navBar } from '../services/routes';

import '../styles/Header.scss';
import { useAuthContext, useDataContext } from '../contexts';
import { toCapitalizeFirstLetters } from '../utils';

type HeaderProps = {
  pageTitle: string;
  setPageTitle: (string: string) => void;
}

function Header(props: HeaderProps) {
  const { config } = useDataContext();
  const { logout, authUser } = useAuthContext();

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
          <span>Conectado como <strong>{authUser?.displayName?.split(' ')[0]}</strong></span>
          <Select />
          <div className="container__menu" onClick={logout}>
            <BiLogOut size={20} />
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
    </div>
  )
}

export default Header