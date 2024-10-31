import { wsConnectOrderHistory, wsDisconnectOrderHistory, } from './../actions/order-history';
import { Middleware, MiddlewareAPI } from 'redux';
import { RootState } from '../store';
import {
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetOrders,
} from '../order-history-slice';
import { WebSocket_URL } from '../../utils/constans';

export const orderHistoryWsMiddleware: Middleware = (store: MiddlewareAPI) => {
	let socket: WebSocket | null = null;

	return next => action => {
		const { dispatch, getState } = store;

		if (wsConnectOrderHistory.match(action)) {
			const state: RootState = getState();
			const accessToken = state.auth.accessToken;

			if (!accessToken) {
				console.error("No access token found");
				return;
			}

            const url = action.payload || `${WebSocket_URL}/orders?token=${accessToken.replace('Bearer ', '')}`;
			socket = new WebSocket(url);

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

		if (wsDisconnectOrderHistory.match(action)) {
			if (socket) {
				socket.close();
				socket = null;
			}
			dispatch(wsConnectionClosed());
		}

		next(action);
	};
};