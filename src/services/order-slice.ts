import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchWithRefresh } from './api';
import { BASE_URL } from '../utils/constans';
import { RootState } from './store';
import { Order, OrderDetailsProps, OrderResponse } from '../utils/types';

interface OrderState {
    orderNumber: number | null;
    loading: boolean;
    error: string | null;
    currentOrder: OrderDetailsProps | null;
}

const initialState: OrderState = {
    orderNumber: null,
    loading: false,
    error: null,
    currentOrder: null,
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

export const fetchOrderByNumber = createAsyncThunk<
    OrderDetailsProps,
    string,
    { state: RootState; rejectValue: string }
>('order/fetchOrderByNumber', async (orderNumber, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/api/orders/${orderNumber}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Ошибка при получении заказа');
        }
        return data.orders[0];
    } catch (error) {
        return rejectWithValue('Не удалось загрузить заказ');
    }
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
        setCurrentOrder(state, action: PayloadAction<OrderDetailsProps | null>) {
            state.currentOrder = action.payload;
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
            })
            .addCase(fetchOrderByNumber.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })
            .addCase(fetchOrderByNumber.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка при загрузке заказа';
            });
    },
});

export const { resetOrder, setCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;
