import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  Calendar,
  Home,
  PointSheets,
  Settings,
  SpreadSheets
} from './pages';
import { Teacher } from './slugs';

import {
  DataContextComponent
} from './contexts';

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
      }
    ]
  }
]);

function App() {
  return (
    <DataContextComponent>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </DataContextComponent>
  )
}

export default App
