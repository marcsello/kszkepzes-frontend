import { WRITE_SOLUTION, WRITE_SOLUTION_FILE, GET_SOLUTIONS, CLEAR_WRITE } from '../actions/types';

const INITIAL_STATE = {
  task: '',
  name: '',
  description: '',
  file: '',
  solutions: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WRITE_SOLUTION:
      return { ...state, [action.target]: action.payload };
    case WRITE_SOLUTION_FILE:
      return { ...state, [action.target]: action.payload };
    case GET_SOLUTIONS:
      return { ...state, solutions: action.payload };
    case CLEAR_WRITE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
