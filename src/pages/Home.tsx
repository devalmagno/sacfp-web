import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { collection, getDocs } from '@firebase/firestore';

import { routes } from '../services/routes';
import { db } from '../services/firebaseConfig';

import { ColumnBox, Header, Section } from '../components';

function Home() {
  const [pageTitle, setPageTitle] = useState('tela inicial');

  const router = useLocation();
  const isHome = router.pathname == '/';

  const teachersCollectionRef = collection(db, "teachers");

  useEffect(() => {
    const getTeachers = async () => {
      const data = await getDocs(teachersCollectionRef);
      console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }

    getTeachers();
  }, []);

  useEffect(() => {
    const { title } = routes.filter(route => `/${route.path}` == router.pathname)[0];
    setPageTitle(title);
  }, [router.pathname]);

  return (
    <>
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

    </>
  );
}

export default Home