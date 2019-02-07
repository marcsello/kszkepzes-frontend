import { SHOW_MESSAGE, DISMISS_MESSAGE } from '../actions/types';

export const dismissMessage = () => (
  (dispatch) => {
    dispatch({ type: DISMISS_MESSAGE });
  }
);

export const showMessage = (text, messageType) => (
  { type: SHOW_MESSAGE, messageType, text }
);
