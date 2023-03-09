import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { routes } from '../services/routes';

import { ColumnBox, Footer, Header } from '../components';

import {
  DataContextComponent, useAuthContext
} from '../contexts';


function Home() {
  const [pageTitle, setPageTitle] = useState('tela inicial');

  const { authUser } = useAuthContext();

  const router = useLocation();
  const navigate = useNavigate();
  const isHome = router.pathname == '/';


  useEffect(() => {
    const pathname = router.pathname.split('/')[0] + router.pathname.split('/')[1];
    const { title } = routes.filter(route => `${route.path}` == pathname)[0];
    setPageTitle(title);
  }, [router.pathname]);

  useEffect(() => {

    if (!authUser) navigate('/login');
  }, []);

  useEffect(() => {

    if (!authUser) navigate('/login');
  }, [authUser])

  return (
    <>
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
    </>
  );
}

export default Home