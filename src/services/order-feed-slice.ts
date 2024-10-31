import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../utils/types';

interface OrdersFeedState {
    orders: Order[];
    total: number;
    totalToday: number;
    isConnected: boolean;
    error: string | null;
}

const initialState: OrdersFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isConnected: false,
    error: null,
};

const ordersFeedSlice = createSlice({
    name: 'ordersFeed',
    initialState,
    reducers: {
        wsConnectionSuccess(state) {
            state.isConnected = true;
            state.error = null;
        },
        wsConnectionError(state, action: PayloadAction<string>) {
            state.isConnected = false;
            state.error = action.payload;
        },
        wsConnectionClosed(state) {
            state.isConnected = false;
        },
        wsGetOrders(state, action: PayloadAction<{ orders: Order[]; total: number; totalToday: number }>) {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
    },
});

export const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetOrders } = ordersFeedSlice.actions;
export default ordersFeedSlice.reducer;