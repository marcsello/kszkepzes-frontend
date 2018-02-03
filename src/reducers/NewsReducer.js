import { GET_NEWS } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NEWS:
      return [ ...state, ...action.payload.data ];
    default:
      return state;
  }
};
