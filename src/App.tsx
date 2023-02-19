import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  AddTeacher,
  Calendar,
  Home,
  PointSheets,
  Settings,
  SpreadSheets
} from './pages';
import { Teacher } from './slugs';


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
      }
    ]
  }
]);

function App() {
  return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
  )
}

export default App
