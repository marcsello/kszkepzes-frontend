import { GET_TASKS, GET_SOLUTIONS, ADD_TASK, DELETE_TASK, ADD_SOLUTION, GET_PROFILES, GET_DOCUMENTS } from '../actions/types';

const INITIAL_STATE = {
  id: 0,
  tasks: [],
  solutions: [],
  profiles: [],
  documents: [],
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasks: action.payload };
    case GET_SOLUTIONS:
      return { ...state, solutions: action.payload };
    case ADD_SOLUTION:
      return { ...state, solutions: [action.payload, ...state.solutions], id: action.payload.id };
    case ADD_TASK:
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case DELETE_TASK:
      return {
        ...state,
        tasks: [...state.tasks.slice(0, state.tasks.indexOf(action.payload)),
          ...state.tasks.slice(state.tasks.indexOf(action.payload) + 1)],
      };
    case GET_PROFILES:
      return { ...state, profiles: action.payload };
    case GET_DOCUMENTS:
      return { ...state, documents: action.payload };
    default:
      return state;
  }
};
