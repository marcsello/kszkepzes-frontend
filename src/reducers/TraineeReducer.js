import { GET_TRAINEES, GET_PROFILES, GET_SELECTED_PROFILE } from '../actions/types';

const INITIAL_STATE = { profiles: [], selectedProfile: {} };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TRAINEES:
      return { ...state, trainees: [...action.payload] };
    case GET_PROFILES:
      return { ...state, profiles: [...action.payload] };
    case GET_SELECTED_PROFILE:
      return { ...state, selectedProfile: action.payload };
    default:
      return state;
  }
};
