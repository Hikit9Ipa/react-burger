import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { rootReducer } from "../../services/reducers/rootReducer";
import thunk from "redux-thunk";
import socketMiddleware from "../../services/socketMiddleware/socketMiddleware";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE,
} from "../../services/reducers/wsReducer";

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export const wsUserActions = {
  wsInit: WS_USER_CONNECTION_START,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onError: WS_USER_CONNECTION_ERROR,
  onMessage: WS_USER_GET_MESSAGE,
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware("wss://norma.nomoreparties.space/orders/all", wsActions),
    socketMiddleware("wss://norma.nomoreparties.space/orders", wsUserActions)
  )
);

export const store = createStore(rootReducer, enhancer);
