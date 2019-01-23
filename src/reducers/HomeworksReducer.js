import { GET_TASKS, GET_SOLUTIONS, ADD_TASK, ADD_SOLUTION } from '../actions/types';

const INITIAL_STATE = {
  tasks: [],
  solutions: [],
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasks: action.payload };
    case GET_SOLUTIONS:
      return { ...state, solutions: action.payload };
    case ADD_SOLUTION:
      return state;
    case ADD_TASK:
      return { tasks: [action.payload, ...state.tasks], solutions: [...state.solutions] };
    default:
      return state;
  }
};
