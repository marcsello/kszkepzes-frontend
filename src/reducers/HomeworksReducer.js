import { GET_TASKS, GET_SOLUTIONS, ADD_TASK, ADD_SOLUTION, GET_PROFILES } from '../actions/types';

const INITIAL_STATE = {
  tasks: [],
  solutions: [],
  profiles: [],
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasks: action.payload };
    case GET_SOLUTIONS:
      return { ...state, solutions: action.payload };
    case ADD_SOLUTION:
      return { ...state, solutions: [action.payload, ...state.solutions] };
    case ADD_TASK:
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case GET_PROFILES:
      return { ...state, profiles: action.payload };
    default:
      return state;
  }
};
