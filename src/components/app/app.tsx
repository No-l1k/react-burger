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
import { OrderFeed } from '../order-feed/order-feed';
import ProtectedRouteElement from '../protected-route/protected-route';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getUserDataRequest } from '../../services/auth-slice';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { fetchIngredients } from '../../services/ingredients-slice';
import OrderDetails from '../order-details/order-details';
import Order from '../../pages/order/order';
import Feed from '../../pages/feed/feed';

export const App = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { isAuthenticated, accessToken } = useAppSelector(
		(state) => state.auth
	);
	const ordersFeed = useAppSelector((state) => state.orderFeed.orders);
	const ordersHistory = useAppSelector((state) => state.orderHistory.orders);
	const { ingredients } = useAppSelector((state) => state.ingredients);
	const currentOrder = useAppSelector((state) => state.order.currentOrder);

	const ingredientDataMap = useMemo(() => {
		const map = ingredients.reduce((acc, ingredient) => {
			acc.set(ingredient._id, {
				price: ingredient.price,
				image: ingredient.image_mobile || '',
				name: ingredient.name,
			});
			return acc;
		}, new Map<string, { price: number; image: string; name: string }>());
		return map;
	}, [ingredients]);

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
					<Route path="/feed" element={<Feed orders={ordersFeed} ingredientDataMap={ingredientDataMap} isProfileOrder={false} />} />
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
								<Profile orders={ordersHistory} ingredientDataMap={ingredientDataMap} isProfileOrder={true} />
							</ProtectedRouteElement>
						}>
						<Route
							path='orders'
							element={
								<ProtectedRouteElement>
									<OrderFeed orders={ordersHistory} ingredientDataMap={ingredientDataMap} isProfileOrder={true} />
								</ProtectedRouteElement>
							}
						/>
					</Route>
					<Route path='/ingredients/:id' element={<Ingredient />} />
					<Route path="/feed/:number" element={<Order ingredientDataMap={ingredientDataMap} />} />
					<Route path="/profile/orders/:number" element={<Order ingredientDataMap={ingredientDataMap} />} />
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
				{location.state?.fromModal && location.state.orderDetails && (
					<Routes>
						<Route
							path="/profile/orders/:number"
							element={
								<Modal onClose={() => window.history.back()}>
									<ProtectedRouteElement>
										<OrderDetails
											orderNumber={location.state.orderDetails.orderNumber}
											orderName={location.state.orderDetails.orderName}
											ingredients={location.state.orderDetails.ingredients}
											totalPrice={location.state.orderDetails.totalPrice}
											orderDate={location.state.orderDetails.orderDate}
										/>
									</ProtectedRouteElement>
								</Modal>
							}
						/>
						<Route
							path="/feed/:number"
							element={
								<Modal onClose={() => window.history.back()}>
									<OrderDetails
										orderNumber={location.state.orderDetails.orderNumber}
										orderName={location.state.orderDetails.orderName}
										ingredients={location.state.orderDetails.ingredients}
										totalPrice={location.state.orderDetails.totalPrice}
										orderDate={location.state.orderDetails.orderDate}
									/>
								</Modal>
							}
						/>
					</Routes>
				)}
			</DndProvider>
		</div>
	);
};
