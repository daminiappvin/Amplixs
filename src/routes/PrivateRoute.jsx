import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const client = useSelector((state) => state.client);
    return isAuthenticated ? <Outlet /> : <Navigate to={`/${client?.client_name}`} />;
};

export default PrivateRoute;
