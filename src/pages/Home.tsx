import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { ColumnBox, Header } from '../components';

import {
  DataContextComponent, RenderReplacementContextComponent, useAuthContext, useDataContext
} from '../contexts';


function Home() {
  const [pageTitle, setPageTitle] = useState('tela inicial');

  const { authUser } = useAuthContext();

  const router = useLocation();
  const isHome = router.pathname == '/';

  return (
    <>
      <DataContextComponent>
        <RenderReplacementContextComponent>
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
        </RenderReplacementContextComponent>
      </DataContextComponent>
    </>
  );
}

export default Home