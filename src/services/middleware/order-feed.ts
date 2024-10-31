import { Middleware, MiddlewareAPI } from 'redux';
import { RootState } from '../store';
import {
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetOrders,
} from '../order-feed-slice'; 
import { wsConnectOrdersFeed, wsDisconnectOrdersFeed } from '../actions/order-feed'
import { WebSocket_URL } from '../../utils/constans';

const ORDERS_FEED_URL = `${WebSocket_URL}/orders/all`;

export const ordersFeedWsMiddleware: Middleware = (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return next => action => {
        const { dispatch } = store;

        if (wsConnectOrdersFeed.match(action)) {
            socket = new WebSocket(ORDERS_FEED_URL);

            socket.onopen = () => {
                dispatch(wsConnectionSuccess());
            };

            socket.onerror = () => {
                dispatch(wsConnectionError("Ошибка соединения"));
            };

            socket.onmessage = event => {
                const data = JSON.parse(event.data);
                const { orders, total, totalToday } = data;

                if (data.success) {
                    dispatch(wsGetOrders({ orders, total, totalToday }));
                } else {
                    dispatch(wsConnectionError("Ошибка получения данных"));
                }
            };

            socket.onclose = () => {
                dispatch(wsConnectionClosed());
            };
        }

        if (wsDisconnectOrdersFeed.match(action)) {
            if (socket) {
                socket.close();
                socket = null;
            }
            dispatch(wsConnectionClosed());
        }

        next(action);
    };
};