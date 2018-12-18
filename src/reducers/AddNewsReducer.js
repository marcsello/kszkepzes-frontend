import { WRITE_NEWS, CLEAR_WRITE } from '../actions/types';

const INITIAL_STATE = { title: '', text: ''};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WRITE_NEWS:
      return {...state, [action.target]: action.payload}
    case CLEAR_WRITE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
