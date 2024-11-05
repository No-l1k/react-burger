import { Middleware, MiddlewareAPI, Dispatch } from '@reduxjs/toolkit';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { wsHistoryOnMessage } from '../order-history-slice';
import { wsFeedOnMessage } from '../order-feed-slice';
import { refreshToken } from '../api';

export type TWsActionTypes<S, R> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    sendMessage?: ActionCreatorWithPayload<S>;
    onConnecting?: ActionCreatorWithoutPayload;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <S, R>(
    wsActions: TWsActionTypes<S, R>,
    withTokenRefresh: boolean = false
): Middleware => {
    return (store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;
        const {
            connect,
            disconnect,
            sendMessage,
            onConnecting,
            onOpen,
            onClose,
            onError,
            onMessage
        } = wsActions;

        let isConnected = false;
        let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

        return (next) => (action) => {
            const { dispatch } = store;

            if (connect.match(action)) {
                
                socket = new WebSocket(action.payload);
                onConnecting && dispatch(onConnecting());

                socket.onopen = () => {
                    isConnected = true;
                    dispatch(onOpen());
                };

                socket.onerror = (event) => {
                    console.error("WebSocket ошибка:", event);
                };

                socket.onclose = () => {
                    dispatch(onClose());
                    isConnected = false;

                    if (reconnectTimer) {
                        clearTimeout(reconnectTimer);
                    }

                    reconnectTimer = setTimeout(() => {
                        dispatch(connect(action.payload));
                    }, RECONNECT_PERIOD);
                };

                socket.onmessage = async (event) => {
                    const { data } = event;

                    try {
                        const parsedData = JSON.parse(data);

                        if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
                            try {
                                const refreshData = await refreshToken();

                                localStorage.setItem('accessToken', refreshData.accessToken);
                                localStorage.setItem('refreshToken', refreshData.refreshToken);

                                const updatedUrl = new URL(action.payload);
                                updatedUrl.searchParams.set("token", refreshData.accessToken.replace("Bearer ", ""));
                                dispatch(connect(updatedUrl.toString()));

                            } catch (err) {
                                console.error("Ошибка обновления токена:", err);
                                dispatch(onError("Token refresh failed"));
                                dispatch(disconnect());
                            }
                            return;
                        }

                        if (action.payload.includes('token')) {
                            dispatch(wsHistoryOnMessage(parsedData)); 
                        } else {
                            dispatch(wsFeedOnMessage(parsedData)); 
                        }
                        
                    } catch (err) {
                        dispatch(onError((err as Error).message));
                    }
                };
            }

            if (socket && sendMessage?.match(action)) {
                try {
                    socket.send(JSON.stringify(action.payload));
                } catch (err) {
                    dispatch(onError((err as Error).message));
                }
            }

            if (socket && disconnect.match(action)) {
                if (reconnectTimer) {
                    clearTimeout(reconnectTimer);
                }
                isConnected = false;
                socket.close();
                socket = null;
            }

            return next(action);
        };
    };
};
