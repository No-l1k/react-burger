import { createAction } from '@reduxjs/toolkit';

export const wsConnectOrderHistory = createAction<string | undefined>('orderHistory/wsConnect');

export const wsDisconnectOrderHistory = createAction("orderHistory/wsDisconnect");