import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './ingredients-slice';
import constructorSlice from './constructor-slice';
import orderSlice from './order-slice';
import { useDispatch, useSelector } from 'react-redux';
import authSlice from './auth-slice';

const store = configureStore({
	reducer: {
		ingredients: ingredientsSlice,
		burgerConstructor: constructorSlice,
		order: orderSlice,
		auth: authSlice,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
