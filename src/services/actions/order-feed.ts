import { createAction } from '@reduxjs/toolkit';

export const wsConnectOrdersFeed = createAction('ordersFeed/wsConnect');
export const wsDisconnectOrdersFeed = createAction("ordersFeed/wsDisconnect");