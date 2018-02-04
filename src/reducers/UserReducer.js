import {
  GET_USERDATA,
  PROFILE_CHANGE,
  GROUP_CHANGE,
  LOGOUT,
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERDATA:
      return { ...state, ...action.payload };
    case PROFILE_CHANGE:
      return { ...state, [action.target]: action.payload };
    case GROUP_CHANGE:
      return { ...state, groups: action.payload };
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
