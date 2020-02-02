import { GET_GROUPS } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_GROUPS:
      return action.payload ;
    default:
      return state;
  }
};
