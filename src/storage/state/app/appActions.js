import {ServerConnectionStatus} from '../../../constants';
import {LoginService} from '../../../services';

export const SET_SERVER_CONNECTION_STATUS = 'SET_SERVER_CONNECTION_STATUS';

export const setServerConnectionStatus =
  serverConnectionStatus => async dispatch => {
    dispatch({
      type: SET_SERVER_CONNECTION_STATUS,
      payload: serverConnectionStatus,
    });

    if (
      serverConnectionStatus === ServerConnectionStatus.CONNECTING ||
      serverConnectionStatus === ServerConnectionStatus.TOKEN_EXPIRED
    ) {
      let result = await LoginService.login();

      if (result) {
        dispatch({
          type: SET_SERVER_CONNECTION_STATUS,
          payload: ServerConnectionStatus.CONNECTED,
        });

        return;
      }

      dispatch({
        type: SET_SERVER_CONNECTION_STATUS,
        payload: ServerConnectionStatus.DISCONNECTED,
      });
    }
  };
