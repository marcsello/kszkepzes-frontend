import {
  GET_USERDATA,
  PROFILE_CHANGE,
  GROUP_CHANGE,
  GET_DEADLINE,
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERDATA:
      return { ...state, ...action.payload };
    case GET_DEADLINE:
      return { ...state, ...action.payload };
    case PROFILE_CHANGE:
      return { ...state, [action.target]: action.payload };
    case GROUP_CHANGE:
      return { ...state, groups: action.payload };
    default:
      return state;
  }
};
