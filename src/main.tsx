import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Layout } from './pages/Layout'

import './index.css'
import { Home } from './pages/Layout/Home'
import { Settings } from './pages/Layout/Settings'
import { Search } from './pages/Layout/Search'
import { Posts } from './pages/Layout/Posts/Posts'
import { UserAccount } from './pages/Layout/UserAccount'
import { Requests } from './pages/Layout/Requests'

const routes = createBrowserRouter([
    {
        path: '',
        element: <Signup />,
    },
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: 'profile',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'settings',
                element: <Settings />,
            },
            {
                path: 'posts',
                element: <Posts />,
            },
            {
                path: 'search',
                element: <Search />,
            },
            {
                path: ':id',
                element: <UserAccount />,
            },
            {
                path: 'requests',
                element: <Requests />,
            },
        ],
    },
])

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={routes}></RouterProvider>
)
