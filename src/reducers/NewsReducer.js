import { GET_NEWS, ADD_NEWS, DELETE_NEWS } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NEWS:
      return action.payload;
    case ADD_NEWS:
      return [action.payload, ...state];
    case DELETE_NEWS:
      const index = state.indexOf(action.payload);
      const array = [...state];
      array.splice(index, 1);
      return [...array];
    default:
      return state;
  }
};
