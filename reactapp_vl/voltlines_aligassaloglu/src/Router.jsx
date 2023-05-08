import React from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import MapView from './views/MapView';
import RouteDetails from './views/RouteDetails';
import Root from './views/Root';
import TableView from './views/TableView';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/map-view" />
            },
            {
                path: '/map-view',
                element: <MapView/>
            },
            {
                path: '/table-view',
                element: <TableView/>
            },
            {
                path: '/route-details',
                element: <RouteDetails/>
            }
        ]
    },

]);

export default Router