import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { routes } from '../services/routes';

import { ColumnBox, Header } from '../components';
import {
  SemesterContextComponent,
  DataContextComponent
} from '../contexts';

function Home() {
  const [pageTitle, setPageTitle] = useState('tela inicial');

  const router = useLocation();
  const isHome = router.pathname == '/';

  useEffect(() => {
    const pathname = router.pathname.split('/')[0] + router.pathname.split('/')[1];
    const { title } = routes.filter(route => `${route.path}` == pathname)[0];
    setPageTitle(title);
  }, [router.pathname]);

  return (
    <SemesterContextComponent>
      <DataContextComponent>
        <Header
          pageTitle={pageTitle}
          setPageTitle={setPageTitle}
        />
        {
          isHome ?
            <section>
              <ColumnBox />
            </section> :
            <Outlet />
        }
      </DataContextComponent>
    </SemesterContextComponent>
  );
}

export default Home