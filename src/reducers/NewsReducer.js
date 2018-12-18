import { GET_NEWS, ADD_NEWS, DELETE_NEWS } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NEWS:
      return action.payload;
    case ADD_NEWS:
      return [action.payload, ...state];
    case DELETE_NEWS:
      state.splice(state.indexOf(action.payload), 1);
      return [...state];
    default:
      return state;
  }
};
