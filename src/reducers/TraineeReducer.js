import { GET_TRAINEES, GET_TRAINEE_BY_ID, GET_PROFILES } from '../actions/types';

const INITIAL_STATE = { profiles: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TRAINEES:
      return { ...state, trainees: [...action.payload] };
    case GET_TRAINEE_BY_ID:
      return { ...state, selectedTrainee: action.payload };
    case GET_PROFILES:
      return { ...state, profiles: [...action.payload] };
    default:
      return state;
  }
};
