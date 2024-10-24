import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, fetchWithRefresh } from './api';
import { RootState } from './store';
import { OrderResponse } from '../utils/types';

interface OrderState {
	orderNumber: number | null;
	loading: boolean;
	error: string | null;
}

const initialState: OrderState = {
	orderNumber: null,
	loading: false,
	error: null,
};

export const orderRequest = createAsyncThunk<
	number,
	string[],
	{ state: RootState; rejectValue: string }
>('order/placeOrder', async (ingredientIds, { getState }) => {
	const state = getState();
	const token = state.auth.accessToken;

	const data = await fetchWithRefresh<OrderResponse>(`${BASE_URL}/api/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
		body: JSON.stringify({ ingredients: ingredientIds }),
	});

	return data.order.number;
});

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		resetOrder(state) {
			state.orderNumber = null;
			state.loading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(orderRequest.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(orderRequest.fulfilled, (state, action) => {
				state.loading = false;
				state.orderNumber = action.payload;
			})
			.addCase(orderRequest.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Ошибка при создании заказа';
			});
	},
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
