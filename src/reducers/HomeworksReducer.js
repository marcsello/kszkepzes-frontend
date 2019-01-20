import { GET_HOMEWORKS, GET_SOLUTIONS } from '../actions/types';

const INITIAL_STATE = {
  tasks: [],
  solutions: [],
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_HOMEWORKS:
      return { ...state, tasks: action.payload };
    case GET_SOLUTIONS:
      return { ...state, solutions: action.payload };
    default:
      return state;
  }
};
