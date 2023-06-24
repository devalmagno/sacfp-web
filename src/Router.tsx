import { createBrowserRouter, Navigate, BrowserRouter, RouterProvider } from 'react-router-dom';

import {
    AddTeacher,
    Calendar,
    ErrorPage,
    FirstAcess,
    Home,
    Login,
    PointSheets,
    Settings,
    SpreadSheets,
} from './pages';
import { Teacher } from './slugs';
import { useAuthContext } from './contexts';
import { useEffect } from 'react';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
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
            {
                path: '/firstacess',
                element: <FirstAcess />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    }
]);

const loginRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
])

export default function Router() {
    const { userIsEnabled } = useAuthContext();

    return (
        <RouterProvider router={userIsEnabled ? router : loginRouter } />
    );
}