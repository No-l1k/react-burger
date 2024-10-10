import s from './app.module.scss';
import { AppHeader } from '../app-header/app-header';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route, useLocation } from 'react-router-dom';

import { Login } from '../../pages/login/login';
import { Register } from '../../pages/register/register';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { Profile } from '../../pages/profile/profile';
import { Ingredient } from '../../pages/ingredient/ingredient';
import { Home } from '../../pages/home/home';
import { OrderHistory } from '../../pages/order-history/order-history';
import ProtectedRouteElement from '../protected-route/protected-route';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getUserDataRequest } from '../../services/auth-slice';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { fetchIngredients } from '../../services/ingredients-slice';

export const App = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { isAuthenticated, accessToken } = useAppSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isAuthenticated && accessToken) {
			dispatch(getUserDataRequest());
		}
	}, [dispatch, isAuthenticated, accessToken]);

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	const backgroundLocation = location.state?.fromModal
		? location.state.backgroundLocation
		: location;

	return (
		<div className={s.app}>
			<AppHeader />
			<DndProvider backend={HTML5Backend}>
				<Routes location={backgroundLocation}>
					<Route path='/' element={<Home />} />
					<Route
						path='/login'
						element={
							<ProtectedRouteElement onlyUnAuth>
								<Login />
							</ProtectedRouteElement>
						}
					/>
					<Route
						path='/register'
						element={
							<ProtectedRouteElement onlyUnAuth>
								<Register />
							</ProtectedRouteElement>
						}
					/>
					<Route
						path='/forgot-password'
						element={
							<ProtectedRouteElement onlyUnAuth>
								<ForgotPassword />
							</ProtectedRouteElement>
						}
					/>
					<Route
						path='/reset-password'
						element={
							<ProtectedRouteElement onlyUnAuth>
								<ResetPassword />
							</ProtectedRouteElement>
						}
					/>
					<Route
						path='/profile'
						element={
							<ProtectedRouteElement>
								<Profile />
							</ProtectedRouteElement>
						}>
						<Route
							path='order-history'
							element={
								<ProtectedRouteElement>
									<OrderHistory />
								</ProtectedRouteElement>
							}
						/>
					</Route>
					<Route path='/ingredients/:id' element={<Ingredient />} />
				</Routes>
				{location.state?.fromModal && (
					<Routes>
						<Route
							path='/ingredients/:id'
							element={
								<Modal onClose={() => window.history.back()}>
									<IngredientDetails />
								</Modal>
							}
						/>
					</Routes>
				)}
			</DndProvider>
		</div>
	);
};
