import orderReducer, { orderRequest, fetchOrderByNumber, resetOrder, setCurrentOrder, initialState } from './order-slice';
import { OrderDetailsProps } from '../utils/types';

describe('orderSlice reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle resetOrder', () => {
    const modifiedState = {
      ...initialState,
      orderNumber: 1234,
      loading: true,
    };
    const state = orderReducer(modifiedState, resetOrder());
    expect(state).toEqual(initialState);
  });

  it('should handle setCurrentOrder', () => {
    const orderDetails: OrderDetailsProps = {
      orderNumber: 1234,
      orderName: 'Test Burger',
      ingredients: [],
      totalPrice: 250,
      orderDate: '2023-01-01',
    };
    const state = orderReducer(initialState, setCurrentOrder(orderDetails));
    expect(state).toEqual({
      ...initialState,
      currentOrder: orderDetails,
    });
  });

  describe('orderRequest async thunk', () => {
    it('should handle orderRequest.pending', () => {
      const state = orderReducer(initialState, { type: orderRequest.pending.type });
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null, 
      });
    });

    it('should handle orderRequest.fulfilled', () => {
      const orderNumber = 1234;
      const state = orderReducer(initialState, { type: orderRequest.fulfilled.type, payload: orderNumber });
      expect(state).toEqual({
        ...initialState,
        loading: false,
        orderNumber,
      });
    });

    it('should handle orderRequest.rejected', () => {
      const error = 'Error creating order';
      const state = orderReducer(initialState, { type: orderRequest.rejected.type, payload: error });
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error,
      });
    });
  });

  describe('fetchOrderByNumber async thunk', () => {
    it('should handle fetchOrderByNumber.pending', () => {
      const state = orderReducer(initialState, { type: fetchOrderByNumber.pending.type });
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });

    it('should handle fetchOrderByNumber.fulfilled', () => {
      const orderDetails: OrderDetailsProps = {
        orderNumber: 1234,
        orderName: 'Test Burger',
        ingredients: [],
        totalPrice: 250,
        orderDate: '2023-01-01',
      };
      const state = orderReducer(initialState, { type: fetchOrderByNumber.fulfilled.type, payload: orderDetails });
      expect(state).toEqual({
        ...initialState,
        loading: false,
        currentOrder: orderDetails,
      });
    });

    it('should handle fetchOrderByNumber.rejected', () => {
      const error = 'Error fetching order';
      const state = orderReducer(initialState, { type: fetchOrderByNumber.rejected.type, payload: error });
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error,
      });
    });
  });
});