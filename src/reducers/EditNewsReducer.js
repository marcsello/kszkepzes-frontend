import { WRITE_NEWS, CLEAR_WRITE, SELECT_NEWS } from '../actions/types';

const INITIAL_STATE = { };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_NEWS:
      return action.payload;
    case WRITE_NEWS:
      return { ...state, [action.target]: action.payload };
    case CLEAR_WRITE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
