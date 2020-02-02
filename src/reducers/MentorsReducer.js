import { GET_MENTORS } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MENTORS:
      return action.payload;
    default:
      return state;
  }
};
