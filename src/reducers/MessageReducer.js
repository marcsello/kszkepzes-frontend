import { SHOW_MESSAGE, DISMISS_MESSAGE } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return { text: action.text, messageType: action.messageType, visible: true };
    case DISMISS_MESSAGE:
      return { text: '', type: '', visible: false };
    default:
      return state;
  }
};
