import { createBrowserRouter, Navigate, BrowserRouter as Router, RouterProvider } from 'react-router-dom';

import {
  AddTeacher,
  Calendar,
  Home,
  Login,
  PointSheets,
  Settings,
  SpreadSheets
} from './pages';
import { Teacher } from './slugs';

import { AuthContext, AuthProvider } from './contexts';
import { useAuthContext } from './contexts/AuthContext';


import './App.scss'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: '/spreadsheets',
        element: <SpreadSheets />,
      },
      {
        path: '/pointsheets',
        element: <PointSheets />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: 'spreadsheets/:id',
        element: <Teacher />
      },
      {
        path: 'teachers/',
        element: <AddTeacher />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]);

function App() {
  // const { authUser } = useAuthContext();

  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router} />
        {/* {authUser ? (
          <RouterProvider router={router} />
        ) : (
          <Router>
            <Navigate to="/login" replace />
          </Router>
        )} */}
      </AuthProvider>
    </div>
  )
}

export default App
