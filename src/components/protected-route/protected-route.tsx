import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

interface ProtectedRouteElementProps {
	children: React.ReactNode;
	onlyUnAuth?: boolean;
}

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({
	children,
	onlyUnAuth = false,
}) => {
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	const location = useLocation();

	if (location.pathname === '/reset-password') {
		const resetPasswordAllowed = localStorage.getItem('resetPasswordAllowed');
		if (!resetPasswordAllowed) {
			return <Navigate to='/forgot-password' />;
		}
	}

	if (!onlyUnAuth && !isAuthenticated) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && isAuthenticated) {
		const { from } = location.state || { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	return <>{children}</>;
};

export default ProtectedRouteElement;
