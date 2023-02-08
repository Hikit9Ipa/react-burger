import { getCookie } from "../../utils/cookie/cookie";

const socketMiddleware = (url, actions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = actions;

      const { auth } = getState().auth;
      const query = auth
        ? `?token=${getCookie("accessToken")}`
        : '';

        if (type === wsInit) {
          socket = new WebSocket(`${url}${query}`);
        } else if (socket && type === onClose) {
        socket.close();
        }
      

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = (event) => {
        };
      }

      next(action);
    };
  };
}

export default socketMiddleware;