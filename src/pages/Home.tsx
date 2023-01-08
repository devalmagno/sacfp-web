import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { ColumnBox, Header, Section } from '../components';

import { routes } from '../services/routes';

function Home() {
  const [pageTitle, setPageTitle] = useState('tela inicial');

  const router = useLocation();
  const isHome = router.pathname == '/';

  useEffect(() => {
    const { title } = routes.filter(route => `/${route.path}` == router.pathname)[0];
    setPageTitle(title);
  }, [router.pathname])

  return (
    <>
      <Header 
        pageTitle={pageTitle} 
        setPageTitle={setPageTitle}
      />
      {
        isHome ?
          <Section>
            <ColumnBox />
          </Section> :
          <Outlet />
      }

    </>
  );
}

export default Home