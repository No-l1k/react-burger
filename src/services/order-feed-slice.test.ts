import ordersFeedSlice, {
    initialState,
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetOrders,
    wsConnecting,
    wsFeedOnMessage,
} from './order-feed-slice';
import { Order } from '../utils/types';

describe('Orders Feed Slice', () => {

    it('should set isConnected to true on wsConnectionSuccess', () => {
        const state = ordersFeedSlice(initialState, wsConnectionSuccess());
        expect(state.isConnected).toBe(true);
        expect(state.error).toBeNull();
    });

    it('should set error on wsConnectionError and mark isConnected as false', () => {
        const errorMessage = 'Connection error';
        const state = ordersFeedSlice(initialState, wsConnectionError(errorMessage));
        expect(state.isConnected).toBe(false);
        expect(state.error).toBe(errorMessage);
    });

    it('should set isConnected to false on wsConnectionClosed', () => {
        const connectedState = { ...initialState, isConnected: true };
        const state = ordersFeedSlice(connectedState, wsConnectionClosed());
        expect(state.isConnected).toBe(false);
    });

    it('should set orders, total, and totalToday on wsGetOrders', () => {
        const ordersData = {
            orders: [{
                ingredients: ['ingredient1', 'ingredient2'],
                _id: '1',
                status: 'done',
                name: 'Order 1',
                createdAt: '2024-11-08T12:00:00Z',
                updatedAt: '2024-11-08T12:30:00Z',
                number: 101,
                orderDate: '2024-11-08',
            }] as Order[],
            total: 100,
            totalToday: 10,
        };
        const state = ordersFeedSlice(initialState, wsGetOrders(ordersData));
        expect(state.orders).toEqual(ordersData.orders);
        expect(state.total).toBe(ordersData.total);
        expect(state.totalToday).toBe(ordersData.totalToday);
    });

    it('should do nothing on wsConnecting', () => {
        const state = ordersFeedSlice(initialState, wsConnecting());
        expect(state).toEqual(initialState); 
    });

    it('should set orders, total, and totalToday on wsFeedOnMessage if success is true', () => {
        const messageData = {
            success: true,
            orders: [{
                ingredients: ['ingredient3', 'ingredient4'],
                _id: '2',
                status: 'pending',
                name: 'Order 2',
                createdAt: '2024-11-08T13:00:00Z',
                updatedAt: '2024-11-08T13:30:00Z',
                number: 102,
                orderDate: '2024-11-08',
            }] as Order[],
            total: 150,
            totalToday: 15,
        };
        const state = ordersFeedSlice(initialState, wsFeedOnMessage(messageData));
        expect(state.orders).toEqual(messageData.orders);
        expect(state.total).toBe(messageData.total);
        expect(state.totalToday).toBe(messageData.totalToday);
    });

    it('should not update orders, total, and totalToday on wsFeedOnMessage if success is false', () => {
        const messageData = {
            success: false,
            orders: [{
                ingredients: ['ingredient5'],
                _id: '3',
                status: 'created',
                name: 'Order 3',
                createdAt: '2024-11-08T14:00:00Z',
                updatedAt: '2024-11-08T14:30:00Z',
                number: 103,
                orderDate: '2024-11-08',
            }] as Order[],
            total: 200,
            totalToday: 20,
        };
        const state = ordersFeedSlice(initialState, wsFeedOnMessage(messageData));
        expect(state.orders).toEqual(initialState.orders);
        expect(state.total).toBe(initialState.total);
        expect(state.totalToday).toBe(initialState.totalToday);
    });
});