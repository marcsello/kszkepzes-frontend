import { WRITE_SOLUTION, CHECK, CLEAR_WRITE } from '../actions/types';

const INITIAL_STATE = {
  accepted: false,
  note: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WRITE_SOLUTION:
      return { ...state, [action.target]: action.payload };
    case CHECK:
      return { ...state, accepted: !state.accepted };
    case CLEAR_WRITE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
