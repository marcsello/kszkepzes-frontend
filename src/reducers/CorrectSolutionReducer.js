import { WRITE_SOLUTION, CHECK } from '../actions/types';

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
    default:
      return state;
  }
};
