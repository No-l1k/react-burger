import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './ingredients-slice';
import constructorSlice from './constructor-slice';
import orderSlice from './order-slice';
import { useDispatch, useSelector } from 'react-redux';
import passwordResetSlice from './password-reset-slice';
import authSlice from './auth-slice';
import orderHistorySlice from './order-history-slice'
import { orderHistoryWsMiddleware } from './middleware/order-history';
import orderFeedSlice from './order-feed-slice'
import { ordersFeedWsMiddleware } from './middleware/order-feed';

const store = configureStore({
	reducer: {
		ingredients: ingredientsSlice,
		burgerConstructor: constructorSlice,
		order: orderSlice,
		passwordReset: passwordResetSlice,
		auth: authSlice,
		orderHistory: orderHistorySlice,
		orderFeed:orderFeedSlice,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(orderHistoryWsMiddleware, ordersFeedWsMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
