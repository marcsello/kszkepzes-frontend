import { GET_TRAINEES, GET_TRAINEE_BY_ID } from '../actions/types';

const INITIAL_STATE = { trainees: [], selectedTrainee: {}};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TRAINEES:
      return { ...state, trainees: [...action.payload] };
    case GET_TRAINEE_BY_ID:
      return { ...state, selectedTrainee: action.payload };
    default:
      return state;
  }
};
