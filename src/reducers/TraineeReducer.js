import { GET_TRAINEES, GET_PROFILES, GET_SELECTED_PROFILE, SET_STATUS } from '../actions/types';

const INITIAL_STATE = { profiles: [], selectedProfile: {} };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TRAINEES:
      return { ...state, trainees: [...action.payload] };
    case GET_PROFILES:
      return { ...state, profiles: [...action.payload] };
    case GET_SELECTED_PROFILE:
      return { ...state, selectedProfile: action.payload };
    case SET_STATUS:
      const index = state.profiles.findIndex(item => item.id === action.payload.id);
      state.profiles.splice(index, 1, action.payload);
      if (action.payload.id === state.selectedProfile.id) {
        return { ...state, profiles: [...state.profiles], selectedProfile: action.payload };
      }
      return { ...state, profiles: [...state.profiles] }
    default:
      return state;
  }
};
