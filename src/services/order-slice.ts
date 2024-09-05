import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const ORDER_API_URL = 'https://norma.nomoreparties.space';

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

export const orderRequest = createAsyncThunk(
	'order/placeOrder',
	async (ingredientIds: string[]) => {
		try {
			const response = await fetch(`${ORDER_API_URL}/api/orders`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ingredients: ingredientIds }),
			});

			const data = await response.json();

			return data.order.number;
		} catch (error) {
			console.error('Ошибка при загрузке заказа:', error);
			throw error;
		}
	}
);

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
				state.error = action.payload as string;
			});
	},
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
