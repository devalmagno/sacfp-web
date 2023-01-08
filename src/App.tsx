import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { 
    Calendar, 
    Home, 
    PointSheets, 
    Settings, 
    SpreadSheets 
} from './pages';

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
