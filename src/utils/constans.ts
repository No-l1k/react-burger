import { createAction } from "@reduxjs/toolkit";
import { IWsMessage } from "./types";

export const BASE_URL = 'https://norma.nomoreparties.space';
export const WebSocket_URL = 'wss://norma.nomoreparties.space'


export const wsActions = {
    connect: createAction<string>('WS_CONNECT'),
    disconnect: createAction('WS_DISCONNECT'),
    sendMessage: createAction<IWsMessage>('WS_SEND_MESSAGE'),
    onConnecting: createAction('WS_ON_CONNECTING'),
    onOpen: createAction('WS_ON_OPEN'),
    onClose: createAction('WS_ON_CLOSE'),
    onError: createAction<string>('WS_ON_ERROR'),
    onMessage: createAction<IWsMessage>('WS_ON_MESSAGE'),
};