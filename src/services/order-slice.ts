import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumber, placeOrder } from './api';
import { RootState } from './store';
import { OrderDetailsProps } from '../utils/types';

interface OrderState {
    orderNumber: number | null;
    loading: boolean;
    error: string | null;
    currentOrder: OrderDetailsProps | null;
}

export const initialState: OrderState = {
    orderNumber: null,
    loading: false,
    error: null,
    currentOrder: null,
};

export const orderRequest = createAsyncThunk<
    number,
    string[],
    { state: RootState; rejectValue: string }
>('order/placeOrder', async (ingredientIds, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    
    if (!token) {
        return rejectWithValue('Нет токена.');
    }

    return await placeOrder(ingredientIds, token);
});

export const fetchOrderByNumber = createAsyncThunk<
    OrderDetailsProps,
    string,
    { rejectValue: string }
>('order/fetchOrderByNumber', async (orderNumber, { rejectWithValue }) => {
    try {
        return await getOrderByNumber(orderNumber);
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
